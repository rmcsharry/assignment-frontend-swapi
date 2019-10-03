import {
  FilterActions,
  SET_PEOPLE_SPECIES_FILTER,
  SET_PEOPLE_MOVIES_FILTER
} from '../actions/filter.actions';
import * as fromRoot from '../../../store/reducers';

export interface FilterType {
  name: string,
  value: string
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
  speciesFilter: null,
  moviesFilter: null,
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
