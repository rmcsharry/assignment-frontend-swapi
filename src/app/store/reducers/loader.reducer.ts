import { LoaderActions, START_LOADER, STOP_LOADER } from '../actions/loader.actions';

export interface State  {
  isLoading: boolean
}
const initialState: State = {
  isLoading: false
}

export function loaderReducer(state: State = initialState, action: LoaderActions) {
  switch (action.type) {
    case START_LOADER:
      return {
        ...state,
        isLoading: true
      };
    case STOP_LOADER:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}

export const getIsLoading = (state: State) => state.isLoading;
