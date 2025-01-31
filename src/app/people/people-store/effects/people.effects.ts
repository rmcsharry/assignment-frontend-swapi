import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, filter, withLatestFrom, takeLast } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { PeopleService } from '../../services/people.service';
import {
  LOAD_PAGE_OF_PEOPLE_SUCCESS,
  LoadPerson,
  LOAD_PERSON,
  LoadPageOfPeople,
  LoadAllPeopleSuccess,
  LoadPersonSuccess,
  LOAD_PAGE_OF_PEOPLE,
} from '../actions/people.actions';

import * as fromPeople from '../reducers/index'
import * as fromRoot from '../../../store/reducers';

import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';

@Injectable()
export class PeopleEffects {

  constructor(
    private actions$: Actions,
    private peopleService: PeopleService,
    private store: Store<fromRoot.State>
  ) { }

  loadAllPeople$ = createEffect(() => this.actions$.pipe(
    ofType<LoadPageOfPeople>(LOAD_PAGE_OF_PEOPLE),
    mergeMap((data) => this.peopleService.getPeople(data.payload.page).pipe(
      map(apiData => {
        if (!apiData.next) {
          // if (data.payload.page === 2) {
          // no more pages, so we can now activate
          this.store.dispatch(new LoadAllPeopleSuccess({ totalPages: data.payload.page }));
        }
        else {
          this.store.dispatch(new LoadPageOfPeople({ page: data.payload.page + 1 }))
        };
        return ({ type: LOAD_PAGE_OF_PEOPLE_SUCCESS, payload: apiData })
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

  // TODO: find a better solution, as the both of the below use withLatestFrom, which is not recommended
  // see this discussion: https://github.com/ngrx/platform/issues/467
  personRouted$ = createEffect(() => this.actions$.pipe(
    ofType<RouterNavigationAction>(ROUTER_NAVIGATION),
    filter((action: RouterNavigationAction<any>) => {
      return action.payload.event.url.includes('/characters/')
    }),
    mergeMap((_) => of(null)
      .pipe(
        withLatestFrom(
          this.store.pipe(select(fromRoot.selectQueryParam('swapiId')))
        ),
        map(routeData => new LoadPerson({ swapiId: routeData[1] })),
        catchError(() => EMPTY)
      ))
  ));

  loadPerson$ = createEffect(() => this.actions$.pipe(
    ofType<LoadPerson>(LOAD_PERSON),
    withLatestFrom(
      this.store.pipe(select(fromPeople.getCurrentPersonId)),
    ),
    filter(([_, currentPersonId]) => currentPersonId === ''),
    mergeMap(([action, _]) => this.peopleService.getPerson(+action.payload.swapiId)
      .pipe(
        map(apiData => new LoadPersonSuccess({ person: apiData, swapiId: action.payload.swapiId } )),
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
