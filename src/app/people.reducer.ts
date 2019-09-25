import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

// import * as fromxReducer from './'

export interface State {
  x: ''; // fromxReducer.State
}
export const reducers: ActionReducerMap<State> = {
  x: null // fromxReducer.xReducer
}

export const getxState = createFeatureSelector<any>('');
// export const getxEvent = createSelector(getxState, fromxReducer.getFunction);
