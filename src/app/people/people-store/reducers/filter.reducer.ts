import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  SET_PEOPLE_FILTER,
  RESET_PEOPLE_FILTERS,
  FilterActions,
  SET_PEOPLE_SPECIES_FILTER
} from '../actions/filter.actions';
import * as fromRoot from '../../../store/reducers';

export const ENUM_FILTERTYPE_SPECIES = 0,
  ENUM_FILTERTYPE_MOVIE = 1,
  ENUM_FILTERTYPE_YEAR = 2,
  ENUMLEN_FILTERTYPE = 3;

export type PeopleFilterType = 'species' | 'films' | 'year';

export interface PeopleFilter {
  filterType: PeopleFilterType;
  type: number; // see ENUM_FILTERTYPE
  value: string;
}

export interface PeopleFilterState {
  speciesFilter: string
  moviesFilter: string
  filtersReset: boolean
}

export interface State extends fromRoot.State {
  peopleFilters: PeopleFilterState
}

const initialState: PeopleFilterState = {
  speciesFilter: '',
  moviesFilter: '',
  filtersReset: false
}

export function filterReducer(state = initialState, action: FilterActions) {
  switch (action.type) {
    case SET_PEOPLE_SPECIES_FILTER:
      return {
        ...state,
        speciesFilter: action.payload.filterValue
      };
    case RESET_PEOPLE_FILTERS:
      return {
        ...state,
        speciesFilter: '',
        moviesFilter: '',
        filtersReset: true,
      };
    default:
      return state;
  }
}

function updateFilterState(filters: PeopleFilter[], newFilter: PeopleFilter) {
  let newFilters = [...filters];
  console.log('NEW FILTERS', newFilters)
  return Object.assign(newFilters, [newFilter]);
}


// export const getPeopleFiltered = createSelector(getPeople, (state: PeopleState) => {
//   if (state.filters[0].value === '' && state.filters[1].value === '' && state.filters[2].value === '') {
//     return state;
//   }
//   console.log("FILTER**** IS", state.filters);
//   let filterResults = { people: state.results, count: 0};
//   state.filters.forEach((filter: PeopleFilter) => {
//     if (filter.value !== '') {
//       filterResults = filterPeople(filterResults.people, filter);
//     };
//   });
//   // let filterResults = filterPeople(filterPeople(state.results, state.filters[0]).people, state.filters[1]);
//   return {
//     ...state,
//     count: filterResults.count,
//     results: [...filterResults.people],
//     totalPages: filterResults.count > 0 ? Math.ceil(filterResults.count / peoplePageSize) : 1
//   }
// })

// function filterPeople(people: Person[], filter: PeopleFilter): { count: number, people: Person[] } {
//   console.log("FILTER VALUE IS", filter)
//   let filtered = people.filter((person: Person) => {
//     return matchElement(person[filter.filterType], filter.value)
//   });
//   console.log("FILTER RESULT IS", filtered)
//   return { count: filtered.length, people: filtered }
// };

// function matchElement(items: string[], element: string): boolean {
//   console.log(items)
//   console.log(element)
//   console.log(items.indexOf(element))
//   return items.indexOf(element) ? false : true
// }
