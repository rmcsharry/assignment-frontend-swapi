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

export const getPeople = createFeatureSelector<LazyPeopleState>('lazyPeople')
export const getPerson = createSelector(getPeople, (state: LazyPeopleState) => state.people.currentPerson);
export const selectCurrentPerson = createSelector(getPeople, fromRoot.selectRouteParam('id'), (state, id) => state.people.results[+id-1]);

export const getCurrentPerson = createSelector(getPeople, (state: LazyPeopleState) => state.people.currentPerson);
export const getCurrentPersonId = createSelector(getPeople, (state: LazyPeopleState) => state.people.currentPersonId);
export const getCurrentPersonSwapiId = createSelector(getPeople, fromRoot.selectQueryParam('swapiId'), (_, swapiId) => swapiId);
export const getIsAllLoaded = createSelector(getPeople, (state: LazyPeopleState) => state.people.allLoaded);

export const getResetPeopleFilter = createSelector(getPeople, (state: LazyPeopleState) => state.filters.filtersReset);
