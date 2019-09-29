import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { PeopleService } from '../services/people.service';
import {
  LOAD_PEOPLE_SUCCESS,
  LOAD_PEOPLE_PAGED,
  LoadPeoplePaged,
} from '../actions/people.actions';
import { Store, select } from '@ngrx/store';
import * as fromPeople from '../reducers/people.reducer'
import * as PeopleActions from '../actions/people.actions';

@Injectable()
export class PeopleEffects {

  constructor(
    private actions$: Actions,
    private peopleService: PeopleService,
    private store: Store<fromPeople.State>
  ) { }

  loadPeoplePaged$ = createEffect(() => this.actions$.pipe(
    ofType<LoadPeoplePaged>(LOAD_PEOPLE_PAGED),
    mergeMap((data) => this.peopleService.getPeople(data.payload.page)
      .pipe(
        map(apiData => {
          if (data.payload.page === data.payload.numberOfPages) {
            // all pages are loaded, so we can now activate page 1
            this.store.dispatch(new PeopleActions.SetPeoplePageNumer({ page: 1 }));
          };
          return ({ type: LOAD_PEOPLE_SUCCESS, payload: apiData })
        }),
        catchError(() => EMPTY)
      ))
    )
  );

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
  //   mergeMap((payload) => this.peopleService.getPerson(payload.id)
  //     .pipe(
  //       map(apiData => ({ type: LOAD_PERSON_SUCCESS, payload: apiData })),
  //       catchError(() => EMPTY)
  //     ))
  //   )
  // );

  // loadPerson$ = createEffect(() => this.actions$.pipe(
  //   ofType<LoadPerson>(LOAD_PERSON),
  //   withLatestFrom(action =>
  //     of(action).pipe(
  //       this.store.pipe(select(fromPeople.getSelectedPerson))
  //       )
  //     ),
  //     filter(([{ payload }, person]) => person.id !== payload.id),
  //     mergeMap((payload) => this.peopleService.getPerson(payload.id)
  //       .pipe(
  //         map(apiData => ({ type: LOAD_PERSON_SUCCESS, payload: apiData })),
  //         catchError(() => EMPTY)
  //       ))
  //   )
  // );

}
