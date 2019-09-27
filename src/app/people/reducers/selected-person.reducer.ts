import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PeopleActions, SELECT_PERSON, UNSELECT_PERSON } from '../actions/people.actions';
import { Person } from '../models/person.model';
import * as fromRoot from '../../app.reducer';


export interface PersonState {
  selectedPerson: Person
}
export interface State extends fromRoot.State {
  person: PersonState
}
const initialState: PersonState = {
  selectedPerson: null
}

export function selectedPersonReducer(state = initialState, action: PeopleActions) {
  console.log('action received:', action)
  switch (action.type) {
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

export const getPersonState = createFeatureSelector<PersonState>('person');

export const getSelectedPerson = createSelector(getPersonState, (state: PersonState) => state.selectedPerson);
