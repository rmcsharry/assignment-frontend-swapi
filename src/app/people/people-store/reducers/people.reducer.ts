import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  PeopleActions,
  SET_CURRENT_PERSON,
  LOAD_PEOPLE_SUCCESS,
  LOAD_PERSON_SUCCESS,
  LOAD_ALL_SUCCESS,
  SET_PEOPLE_FILTER
} from '../actions/people.actions';
import { Person } from '../../models/person.model';
import * as fromRoot from '../../../store/reducers';

export const peoplePageSize = 10;


export const  ENUM_FILTERTYPE_SPECIES = 0,
              ENUM_FILTERTYPE_MOVIE = 1,
              ENUM_FILTERTYPE_YEAR = 2,
              ENUMLEN_FILTERTYPE = 3;

export interface PeopleFilter {
  type: number, // see ENUM_FILTERTYPE
  value: string
}

export interface PeopleState {
  results: Person[]
  count: number
  next: string
  previous: string
  page: number
  currentPerson: Person
  currentPersonId: number
  allLoaded: boolean
  totalPages: number
  filters: PeopleFilter[]
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
  totalPages: 0,
  filters: [
    { type: ENUM_FILTERTYPE_SPECIES, value: ''},
    { type: ENUM_FILTERTYPE_MOVIE, value: ''},
    { type: ENUM_FILTERTYPE_YEAR, value: ''},
  ]
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
    case SET_PEOPLE_FILTER:
      return {
        ...state,
        filters: updateFilterState(state.filters, action.payload)
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
        currentPerson: findPerson(state, action.payload.internalId),
        currentPersonId: action.payload.internalId
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
    return state.results[index - 1];
}

function updateFilterState(filters: PeopleFilter[], newFilter: PeopleFilter) {
  let newFilters = [...filters];
  console.log('NEW FILTERS', newFilters)
  return Object.assign(newFilters, [newFilter]);
}

export const getPeople = createFeatureSelector<PeopleState>('people')
export const getPerson = createSelector(getPeople, (state: PeopleState) => state.currentPerson);
export const selectCurrentPerson = createSelector(getPeople, fromRoot.selectRouteParam('id'), (people, id) => people.results[+id-1]);

export const getCurrentPerson = createSelector(getPeople, (state: PeopleState) => state.currentPerson);
export const getCurrentPersonId = createSelector(getPeople, (state: PeopleState) => state.currentPersonId);
export const getCurrentPersonSwapiId = createSelector(getPeople, fromRoot.selectQueryParam('swapiId'), (_, swapiId) => swapiId)
export const getIsAllLoaded = createSelector(getPeople, (state: PeopleState) => state.allLoaded);

export const getPeopleFiltered = createSelector(getPeople, (state: PeopleState) => {
  if (state.filters[0].value === '' && state.filters[1].value === '' && state.filters[2].value === '') {
    return state;
  }
  console.log("FILTER**** IS", state.filters);
  let filterResults = filterPeople(state.results, state.filters[0].value);
  return {
    ...state,
    count: filterResults.count,
    results: [...filterResults.people],
    totalPages: filterResults.count > 0 ? Math.ceil(filterResults.count / peoplePageSize) : 1
  }
})

function filterPeople(people: Person[], filterValue: string): { count: number, people: Person[] } {
  console.log("FILTER VALUE IS", filterValue)
  let filtered = people.filter(person => {
    return matchElement(person.species, filterValue)
  });
  console.log("FILTER RESULT IS", filtered)
  return { count: filtered.length, people: filtered }
};

function matchElement(items: string[], element: string): boolean {
  console.log(items)
  console.log(element)
  console.log(items.indexOf(element))
  return items.indexOf(element) ? false : true
}
