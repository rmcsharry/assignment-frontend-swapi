import {
  FilterActions,
  SET_PEOPLE_SPECIES_FILTER,
  SET_PEOPLE_MOVIES_FILTER
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
    case SET_PEOPLE_MOVIES_FILTER:
      return {
        ...state,
        moviesFilter: action.payload.filterValue
      };
    default:
      return state;
  }
}
