import * as fromRouter from '@ngrx/router-store';
import * as fromLoader from './loader.reducer';
import * as fromInit from './init.reducer';

import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

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

export const getLoaderState = createFeatureSelector<fromLoader.State>('loader');
export const getIsLoading = createSelector(getLoaderState, fromLoader.getIsLoading);

export const selectRouter = createFeatureSelector<State, fromRouter.RouterReducerState<any>>('router');

export const {
  selectQueryParams,    // select the current route query params
  selectQueryParam,     // factory function to select a query param
  selectRouteParams,    // select the current route params
  selectRouteParam,     // factory function to select a route param
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = fromRouter.getSelectors(selectRouter);
