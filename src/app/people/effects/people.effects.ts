import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { PeopleService } from '../services/people.service';
import { LOAD_PEOPLE_SUCCESS, LOAD_PEOPLE_PAGED, LoadPeoplePaged } from '../actions/people.actions';

@Injectable()
export class PeopleEffects {

  constructor(
    private actions$: Actions,
    private peopleService: PeopleService
  ) { }

  loadPeople$ = createEffect(() => this.actions$.pipe(
    ofType<LoadPeoplePaged>(LOAD_PEOPLE_PAGED),
    mergeMap((payload) => this.peopleService.getPeople(payload.page)
      .pipe(
        map(apiData => ({ type: LOAD_PEOPLE_SUCCESS, payload: apiData, page: payload.page })),
        catchError(() => EMPTY)
      ))
    )
  );

}
