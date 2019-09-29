import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  PeopleActions,
  SET_CURRENT_PERSON,
  LOAD_PEOPLE_SUCCESS,
  LOAD_PERSON_SUCCESS,
  SET_PEOPLE_PAGE_NUMBER,
  LOAD_PERSON
} from '../actions/people.actions';
import { Person } from '../../models/person.model';
import * as fromRoot from '../../../store/reducers';
import { selectRouteId } from '../../../store/reducers/index';

export interface PeopleState {
  results: Person[]
  count: number,
  next: string,
  previous: string,
  page: number,
  currentPerson: Person
  currentPersonId: number
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
  currentPerson: null,
  currentPersonId: 0
}

export function peopleReducer(state = initialState, action: PeopleActions) {
  console.log('STORE HAS', state.results);
  switch (action.type) {
    case LOAD_PEOPLE_SUCCESS:
      return {
        ...state,
        results: [...state.results, ...action.payload.results],
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
      }
    case SET_PEOPLE_PAGE_NUMBER:
      return {
        ...state,
        page: action.payload.page
      };
    case SET_CURRENT_PERSON:
      console.log('PERSON SELECTED', state, action.payload);
      return {
        ...state,
        currentPerson: findPerson(state, action.payload.id)
      };
    // case LOAD_PERSON:
    //   return {
    //     ...state,
    //     currentPersonId: action.payload.id
    //   };
    case LOAD_PERSON_SUCCESS:
      console.log('PERSON LOADED', state, action.payload);
      return {
        ...state,
        currentPerson: action.payload
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

export const getPeople= createFeatureSelector<PeopleState>('people')
export const getPerson = createSelector(getPeople, (state: PeopleState) => state.currentPerson);
export const selectCurrentPerson = createSelector(getPeople, selectRouteId, (people, id) => people.results[+id-1]);

export const getCurrentPerson = createSelector(getPeople, (state: PeopleState) => state.currentPerson);
export const getCurrentPersonId = createSelector(getPeople, (state: PeopleState) => state.currentPersonId);

// export const getPageOfPeople = createSelector(getPeople, (state: PeopleState) => state);
// export const getPeopleState = createFeatureSelector<State>('people');

// export const getPeople = createSelector(getPeopleState, (state: State) => state.people);
// export const getPeoplePageNumber = createSelector(getPeopleState, (state: State) => state.people.page);


// export const getPageOfPeople = createSelector(getPeopleState, (state: State) =>
//   state.people);
// .slice[(state.people.page * pageSize), pageSize]
