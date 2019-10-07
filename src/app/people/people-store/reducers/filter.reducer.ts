import {
  FilterActions,
  SET_PEOPLE_SPECIES_FILTER,
  SET_PEOPLE_MOVIES_FILTER,
  SET_PEOPLE_BORN_FROM_FILTER,
  SET_PEOPLE_BORN_TO_FILTER
} from '../actions/filter.actions';
import * as fromRoot from '../../../store/reducers';

export interface FilterType {
  name: string,
  value: string | number
}

export interface PeopleFilterState {
  speciesFilter: string
  moviesFilter: string
  bornFromFilter: number
  bornToFilter: number
}

export interface State extends fromRoot.State {
  peopleFilters: PeopleFilterState
}

const initialState: PeopleFilterState = {
  speciesFilter: null,
  moviesFilter: null,
  bornFromFilter: null,
  bornToFilter: null
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
    case SET_PEOPLE_BORN_FROM_FILTER:
      return {
        ...state,
        bornFromFilter: action.payload.filterValue
      };
    case SET_PEOPLE_BORN_TO_FILTER:
      return {
        ...state,
        bornToFilter: action.payload.filterValue
      };
    default:
      return state;
  }
}
