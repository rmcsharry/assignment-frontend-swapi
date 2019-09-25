import { LoaderActions, START_LOADER, STOP_LOADER } from './loader.actions';

export interface State {
  isLoading: boolean;
}
const initialState: State = {
  isLoading: false
}

export function loaderReducer(state = initialState, action: LoaderActions) {
  console.log('action received:', action)
  switch (action.type) {
    case START_LOADER:
      return {
        isLoading: true
      };
    case STOP_LOADER:
      return {
        isLoading: false
      };
    default:
      state;
  }
}

export const getIsLoading = (state: State) => state.isLoading;
