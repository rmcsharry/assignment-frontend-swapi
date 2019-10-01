import * as fromRouter from '@ngrx/router-store';
import * as fromLoader from './loader.reducer';
import * as fromInit from './init.reducer';

import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { InitState } from './init.reducer';

export interface State {
  initData: fromInit.InitState,
  loader: fromLoader.State,
  router: fromRouter.RouterReducerState<any>;
}

export const reducers: ActionReducerMap<State> = {
  initData: fromInit.initReducer,
  loader: fromLoader.loaderReducer,
  router: fromRouter.routerReducer
};

// ROUTING
export const selectRouter = createFeatureSelector<State, fromRouter.RouterReducerState<any>>('router');
export const {
  selectQueryParams,    // select the current route query params
  selectQueryParam,     // factory function to select a query param
  selectRouteParams,    // select the current route params
  selectRouteParam,     // factory function to select a route param
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = fromRouter.getSelectors(selectRouter);

// LOADER
export const getLoaderState = createFeatureSelector<fromLoader.State>('loader');
export const getIsLoading = createSelector(getLoaderState, fromLoader.getIsLoading);

// INIT DATA
export const getInitData = createFeatureSelector<State, fromInit.InitState>('initData');
export const getIsInitLoadComplete = createSelector(getInitData, (state: InitState) => state.initLoadedCounter === 3);
export const getMovies = createSelector(getInitData, (state: InitState) => state.movies);
export const getSpecies = createSelector(getInitData, (state: InitState) => state.species);
export const getStarships = createSelector(getInitData, (state: InitState) => state.starships);
// TODO: refactor these selectors to DRY them out
export const findASpecies = (url: string) => createSelector(getInitData, (state: InitState) => state.species.find(el => el.url === url));
export const findAStarship = (url: string) => createSelector(getInitData, (state: InitState) => state.starships.find(el => el.url === url));
export const findAMovie = (url: string) => createSelector(getInitData, (state: InitState) => state.movies.find(el => el.url === url));

