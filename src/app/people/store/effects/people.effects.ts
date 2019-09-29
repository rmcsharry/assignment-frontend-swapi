import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, filter, withLatestFrom, takeLast } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { PeopleService } from '../../services/people.service';
import {
  LOAD_PEOPLE_SUCCESS,
  LoadPerson,
  LOAD_PERSON,
  LOAD_PERSON_SUCCESS,
  SetPeoplePageNumer,
  LOAD_ALL_PEOPLE,
  LoadAllPeople,
  LoadAllSuccess,
  LoadPersonSuccess,
} from '../actions/people.actions';

import * as fromPeople from '../reducers/people.reducer'
import * as fromRoot from '../../../store/reducers';

import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';

@Injectable()
export class PeopleEffects {

  constructor(
    private actions$: Actions,
    private peopleService: PeopleService,
    private store: Store<fromPeople.State>
  ) { }


  loadAllPeople$ = createEffect(() => this.actions$.pipe(
    ofType<LoadAllPeople>(LOAD_ALL_PEOPLE),
    mergeMap((data) => this.peopleService.getPeople(data.payload.page).pipe(
      map(apiData => {
        console.log('data from API is', apiData)
        if (!apiData.next) {
          // no more pages, so we can now activate page 1
          this.store.dispatch(new SetPeoplePageNumer({ page: 1 }));
          this.store.dispatch(new LoadAllSuccess({ totalPages: data.payload.page }));
        }
        else {
          this.store.dispatch(new LoadAllPeople({ page: data.payload.page + 1 }))
        }
        return ({ type: LOAD_PEOPLE_SUCCESS, payload: apiData })
      }),
      catchError(() => EMPTY)
    ))
  ));


  // TODO: figure out why, in this effect, the selectPersonRouteid is always 0
  // see personRouted below this one which is somewhat hacky but works

  // personRouted$ = createEffect(() => this.actions$.pipe(
  //   ofType<RouterNavigationAction>(ROUTER_NAVIGATED),
  //   filter((action: RouterNavigationAction<any>) => {
  //     return action.payload.event.url.includes('/characters/')
  //   }),
  //   withLatestFrom(
  //     this.store.pipe(select(fromRoot.selectPersonRouteId))
  //   ),
  //   // filter(([{ payload }, routeId]) => routeId !== payload.id),
  //   mergeMap((_, routeId) => {
  //     console.log(routeId);
  //     if (routeId > 0)
  //       return of(new LoadPerson({ id: +routeId }));
  //     else
  //       return EMPTY;
  //   })
  // ));

  // TODO: find a better solution, as the below use withLatestFrom, which is not recommended
  // see this discussion: https://github.com/ngrx/platform/issues/467
  personRouted$ = createEffect(() => this.actions$.pipe(
    ofType<RouterNavigationAction>(ROUTER_NAVIGATION),
    filter((action: RouterNavigationAction<any>) => {
      return action.payload.event.url.includes('/characters/')
    }),
    mergeMap((action) => of(null)
      .pipe(
        withLatestFrom(
          this.store.pipe(select(fromRoot.selectRouteParam('id')))
        ),
        map(routeData => new LoadPerson({ internalId: +routeData[1] })),
        catchError(() => EMPTY)
      ))
  ));

  loadPerson$ = createEffect(() => this.actions$.pipe(
    ofType<LoadPerson>(LOAD_PERSON),
    withLatestFrom(
      this.store.pipe(select(fromPeople.getCurrentPersonId)),
      this.store.pipe(select(fromPeople.getCurrentPersonSwapiId))
    ),
    filter(([action, currentPersonId, swapiId]) => {
      console.log('**ID CHECK**', currentPersonId, swapiId)
      return currentPersonId !== action.payload.internalId
    }),
    mergeMap(([action, _, swapiId]) => this.peopleService.getPerson(+swapiId)
      .pipe(
        map(apiData => new LoadPersonSuccess({ person: apiData, id: action.payload.internalId } )),
        catchError(() => EMPTY)
      ))
    )
  );

  // TODO: implement a custom serializer, maybe like this one:
  // https://stackoverflow.com/questions/52218583/ngrx-multi-level-route-params-not-able-to-access-from-customserializer-router/52255078#52255078
  // OR consider creating custom structure for root data, like this:
  // https://medium.com/simars/ngrx-router-store-reduce-select-route-params-6baff607dd9
  // @Effect()
  // personRouted$ = this.actions$.pipe(
  //   ofType<RouterNavigationAction>(ROUTER_NAVIGATION),
  //   filter((action: RouterNavigationAction<any>) => {
  //     return action.payload.event.url.includes('/characters/')
  //   }),
  //   mergeMap((action) => this.peopleService.getPerson(action.payload.event.state.root.firstChild.firstChild.params.id)
  //     .pipe(
  //       map(apiData => ({ type: PeopleActions.LOAD_PERSON_SUCCESS, payload: apiData })),
  //       catchError(() => EMPTY)
  //     ))
  // );

}
