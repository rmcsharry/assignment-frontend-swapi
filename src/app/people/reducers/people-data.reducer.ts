import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';

import { PeopleActions, LOAD_PEOPLE_SUCCESS, SET_PEOPLE, SELECT_PERSON, UNSELECT_PERSON } from '../actions/people.actions';
import { Person } from '../models/person.model';
import * as fromRoot from '../../app.reducer';
import { JsonApi } from '../../types/json-api.interface';

import * as fromPeople from './people.reducer';
import {peopleReducer} from './people.reducer';

export interface PeopleDataState {
  // peoplePaged: JsonApi<Person[]>
  people: fromPeople.PeopleState
  page: number
  selectedPerson: Person
}
export interface State extends fromRoot.State {
  peopleData: PeopleDataState
}
const initialState: PeopleDataState = {
  people: null,
  page: 1,
  selectedPerson: null
}

export function peopleDataReducer(state = initialState, action: PeopleActions) {
  console.log('action received:', action)
  switch (action.type) {
    // case LOAD_PEOPLE_SUCCESS:
    //     console.log('STORING people', state.results, action.payload);
    //   return {
    //     ...state,
    //     results: action.payload.results,
    //     count: action.payload.count,
    //     next: action.payload.next,
    //     previous: action.payload.previous
    //   }
    case SET_PEOPLE:
      console.log('setting people', state, action.payload);
      return {
        ...state,
        people: action.payload
      }
    case SELECT_PERSON:
      console.log('PERSON SELECTED', state, action.payload);

      return {
        ...state,
        selectedPerson: state[action.payload]
      };
    case UNSELECT_PERSON:
      return {
        ...state,
        selectedPerson: null
      };
    default:
      state;
  }
}
// export const peopleFeatureKey = 'peoplee';

export const getPeopleState = createFeatureSelector<PeopleDataState>('peopleData');

export const getPeople = createSelector(getPeopleState, (state: PeopleDataState) => state.people);
export const getSelectedPerson = createSelector(getPeopleState, (state: PeopleDataState) => state.selectedPerson);
