import { createFeatureSelector, createSelector } from '@ngrx/store';

// import * as fromxReducer from './'
export interface State {
  isLoading: boolean;
}
const initialState: State = {
  isLoading: false
}

export function appReducer(state = initialState, action) {
  console.log('action received:', action)
  switch (action.type) {
    case 'START_LOADING':
      return {
        isLoading: true
      };
    case 'STOP_LOADING':
      return {
        isLoading: false
      };
    default:
      state;
  }
}

// export const reducers: ActionReducerMap<State> = {
//   x: null // fromxReducer.xReducer
// }

export const getxState = createFeatureSelector<any>('');
// export const getxEvent = createSelector(getxState, fromxReducer.getFunction);
