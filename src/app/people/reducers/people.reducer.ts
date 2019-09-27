import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PeopleActions, LOAD_PEOPLE_SUCCESS } from '../actions/people.actions';
import { Person } from '../models/person.model';
import * as fromRoot from '../../app.reducer';

export interface PeopleState {
  results: Person[]
  count: number,
  next: string,
  previous: string,
  page: number
}

export interface State extends fromRoot.State {
  people: PeopleState
}

const initialState: PeopleState = {
  results: [],
  count: 0,
  next: null,
  previous: null,
  page: 1,
}

export function peopleReducer(state = initialState, action: PeopleActions) {
  switch (action.type) {
    case LOAD_PEOPLE_SUCCESS:
      return {
        results: action.payload.results,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        page: action.page
      }
    default:
      return state;
  }
}

// export const peopleFeatureKey = 'people';

export const getPeopleState = createFeatureSelector<State>('people');

export const getPeople = createSelector(getPeopleState, (state: State) => state.people);
export const getPeoplePageNumber = createSelector(getPeopleState, (state: State) => state.people.page);
