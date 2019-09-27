import { LoaderActions, START_LOADER, STOP_LOADER } from './loader.actions';

export interface State  {
  isLoading: boolean;
}
const initialState: State = {
  isLoading: true
}

export function loaderReducer(state: State = initialState, action: LoaderActions) {
  console.log('LOADER action received:', action, 'STATE IS:', state)
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
