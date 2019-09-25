import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromLoader from './shared/loader.reducer';

export interface State {
  loader: fromLoader.State;
}

export const reducers: ActionReducerMap<State> = {
  loader: fromLoader.loaderReducer
}

export const getLoaderState = createFeatureSelector<fromLoader.State>('loader');
export const getIsLoading = createSelector(getLoaderState, fromLoader.getIsLoading);
