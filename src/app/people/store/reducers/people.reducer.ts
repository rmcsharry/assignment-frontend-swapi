import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  PeopleActions,
  SET_CURRENT_PERSON,
  LOAD_PEOPLE_SUCCESS,
  LOAD_PERSON_SUCCESS,
  SET_PEOPLE_PAGE_NUMBER,
  LOAD_ALL_SUCCESS
} from '../actions/people.actions';
import { Person } from '../../models/person.model';
import * as fromRoot from '../../../store/reducers';

export interface PeopleState {
  results: Person[]
  count: number,
  next: string,
  previous: string,
  page: number,
  currentPerson: Person
  currentPersonId: number
  allLoaded: boolean
  totalPages: number
}

export interface State extends fromRoot.State {
  people: PeopleState
}

const initialState: PeopleState = {
  results: [],
  count: 0,
  next: null,
  previous: null,
  page: 0,
  currentPerson: null,
  currentPersonId: 0,
  allLoaded: false,
  totalPages: 0
}

export function peopleReducer(state = initialState, action: PeopleActions) {
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
    case LOAD_ALL_SUCCESS:
      return {
        ...state,
        allLoaded: true,
        totalPages: action.payload.totalPages
      };
    case SET_CURRENT_PERSON:
      return {
        ...state,
        currentPerson: findPerson(state, action.payload.id),
        currentPersonId: action.payload.id
      };
    case LOAD_PERSON_SUCCESS:
      return {
        ...state,
        currentPerson: action.payload.person,
        currentPersonId: action.payload.id
      };
    default:
      return state;
  }
}

// export const peopleFeatureKey = 'people';

function findPerson(state: PeopleState, index: number): Person | null {
  if (state.results.length === 0) {
    console.warn('NO DATA but tried to set person ', index);
    return null;
  } else
    return state.results[index];
}

export const getPeople= createFeatureSelector<PeopleState>('people')
export const getPerson = createSelector(getPeople, (state: PeopleState) => state.currentPerson);
export const selectCurrentPerson = createSelector(getPeople, fromRoot.selectRouteParam('id'), (people, id) => people.results[+id-1]);

export const getCurrentPerson = createSelector(getPeople, (state: PeopleState) => state.currentPerson);
export const getCurrentPersonId = createSelector(getPeople, (state: PeopleState) => state.currentPersonId);
export const getCurrentPersonSwapiId = createSelector(getPeople, fromRoot.selectQueryParam('swapiId'), (_, swapiId) => swapiId)
export const getIsAllLoaded = createSelector(getPeople, (state: PeopleState) => state.allLoaded);
