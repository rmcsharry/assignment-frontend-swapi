import { createFeatureSelector, createSelector, Store } from '@ngrx/store';

import { PeopleActions, SET_SELECTED_PERSON, LOAD_PEOPLE_SUCCESS, LoadPerson, LOAD_PERSON_SUCCESS } from '../actions/people.actions';
import { Person } from '../models/person.model';
import * as fromRoot from '../../app.reducer';

export interface PeopleState {
  results: Person[]
  count: number,
  next: string,
  previous: string,
  page: number,
  selectedPerson: Person
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
  selectedPerson: null
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
    case SET_SELECTED_PERSON:
      console.log('PERSON SELECTED', state, action.payload);
      return {
        ...state,
        selectedPerson: findPerson(state, action.payload)
      };
    case LOAD_PERSON_SUCCESS:
      console.log('PERSON LOADED', state, action.payload);
      return {
        ...state,
        selectedPerson: action.payload
      };
    default:
      return state;
  }
}

// export const peopleFeatureKey = 'people';

function findPerson(state: PeopleState, index: number): Person | null {
  if (state.results.length === 0) {
    console.log('NO DATA');
    // Store<PeopleState> dispatch(new LoadPerson(index))
    return null;
  } else
    return state.results[index];
}

export const getPeopleState = createFeatureSelector<State>('people');

export const getPeople = createSelector(getPeopleState, (state: State) => state.people);
export const getPeoplePageNumber = createSelector(getPeopleState, (state: State) => state.people.page);
export const getSelectedPerson = createSelector(getPeopleState, (state: State) => state.people.selectedPerson);
