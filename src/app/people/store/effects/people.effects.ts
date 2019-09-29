import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, filter, withLatestFrom, takeLast } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { PeopleService } from '../../services/people.service';
import {
  LOAD_PEOPLE_SUCCESS,
  LOAD_PEOPLE_PAGED,
  LoadPeoplePaged,
  LoadPerson,
  LOAD_PERSON,
  LOAD_PERSON_SUCCESS,
  SetPeoplePageNumer,
} from '../actions/people.actions';

import * as fromPeople from '../reducers/people.reducer'
import * as fromRoot from '../../../store/reducers';

import { ROUTER_NAVIGATION, ROUTER_NAVIGATED, RouterNavigationAction } from '@ngrx/router-store';
import {NavigationEnd} from '@angular/router';

@Injectable()
export class PeopleEffects {

  constructor(
    private actions$: Actions,
    private peopleService: PeopleService,
    private store: Store<fromPeople.State>
  ) { }

  loadPeoplePaged$ = createEffect(() => this.actions$.pipe(
    ofType<LoadPeoplePaged>(LOAD_PEOPLE_PAGED),
    mergeMap((data) => this.peopleService.getPeople(data.payload.page).pipe(
      map(apiData => {
        if (data.payload.page === data.payload.numberOfPages) {
          // all pages are loaded, so we can now activate page 1
          this.store.dispatch(new SetPeoplePageNumer({ page: 1 }));
        };
        return ({ type: LOAD_PEOPLE_SUCCESS, payload: apiData })
      }),
      catchError(() => EMPTY)
    ))
  ));

  // TODO: figure out why the selectedRouteid is always 0
  // see personRouted below this one which is somewhat hacky but works

  // personRouted$ = createEffect(() => this.actions$.pipe(
  //   ofType<RouterNavigationAction>(ROUTER_NAVIGATED),
  //   filter((action: RouterNavigationAction<any>) => {
  //     return action.payload.event.url.includes('/characters/')
  //   }),
  //   withLatestFrom(
  //     this.store.pipe(select(fromRoot.selectRouteId))
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

  personRouted$ = createEffect(() => this.actions$.pipe(
    ofType<RouterNavigationAction>(ROUTER_NAVIGATED),
    filter((action: RouterNavigationAction<any>) => {
      return action.payload.event.url.includes('/characters/')
    }),
    mergeMap((action) => of(null)
      .pipe(
        withLatestFrom(
          this.store.pipe(select(fromRoot.selectRouteId))
        ),
        map(routeData => new LoadPerson({id: +routeData[1]}) ),
        catchError(() => EMPTY)
      ))
  ));

  loadPerson$ = createEffect(() => this.actions$.pipe(
    ofType<LoadPerson>(LOAD_PERSON),
    mergeMap((data) => this.peopleService.getPerson(data.payload.id)
      .pipe(
        map(apiData => ({ type: LOAD_PERSON_SUCCESS, payload: apiData })),
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



// getPageOfPeople$ = createEffect(() => this.actions$.pipe(
//   ofType<GetPageOfPeople>(GET_PAGE_OF_PEOPLE),
//   mergeMap((payload) => this.peopleService.getPerson(payload.id)
//     .pipe(
//       map(apiData => ({ type: LOAD_PERSON_SUCCESS, payload: apiData })),
//       catchError(() => EMPTY)
//     ))
//   )
// );

// loadPerson$ = createEffect(() => this.actions$.pipe(
//   ofType<LoadPerson>(LOAD_PERSON),
//   withLatestFrom(
//       this.store.pipe(select(fromRoot.selectRouteId))
//     ),
//     filter(([{ payload }, routeId]) => +routeId !== payload.id),
//     mergeMap((payload) => this.peopleService.getPerson(payload.id)
//       .pipe(
//         map(apiData => ({ type: LOAD_PERSON_SUCCESS, payload: apiData })),
//         catchError(() => EMPTY)
//       ))
//   )
// );

}
