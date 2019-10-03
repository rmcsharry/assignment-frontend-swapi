import * as fromRoot from '../../../store/reducers';
import * as fromPeople from './people.reducer';
import * as fromFilter from './filter.reducer';

import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';


export const peoplePageSize = 10;

export interface LazyPeopleState {
  people: fromPeople.PeopleState,
  filters: fromFilter.PeopleFilterState,
}

export interface State extends fromRoot.State {
  people: LazyPeopleState
}

export const peopleReducers: ActionReducerMap<LazyPeopleState> = {
  people: fromPeople.peopleReducer,
  filters: fromFilter.filterReducer,
};

export const getLazyPeople = createFeatureSelector<LazyPeopleState>('lazyPeople')
export const getPerson = createSelector(getLazyPeople, (state: LazyPeopleState) => state.people.currentPerson);
export const selectCurrentPerson = createSelector(getLazyPeople, fromRoot.selectRouteParam('id'), (state, id) => state.people.results[+id-1]);

export const getCurrentPerson = createSelector(getLazyPeople, (state: LazyPeopleState) => state.people.currentPerson);
export const getCurrentPersonId = createSelector(getLazyPeople, (state: LazyPeopleState) => state.people.currentPersonId);
export const getCurrentPersonSwapiId = createSelector(getLazyPeople, fromRoot.selectQueryParam('swapiId'), (_, swapiId) => swapiId);
export const getIsAllLoaded = createSelector(getLazyPeople, (state: LazyPeopleState) => state.people.allLoaded);

export const getPeopleFilters = createSelector(getLazyPeople, (state: LazyPeopleState): Array<fromFilter.FilterType> => {
  return [
    { name: 'species', value: state.filters.speciesFilter },
    { name: 'films', value: state.filters.moviesFilter }
  ]
});
export const getSpeciesFilter = createSelector(getLazyPeople, (state: LazyPeopleState) => state.filters.speciesFilter);
export const getMoviesFilter = createSelector(getLazyPeople, (state: LazyPeopleState) => state.filters.moviesFilter);

export const getPeople = createSelector(getLazyPeople, (state: LazyPeopleState) => state.people);
