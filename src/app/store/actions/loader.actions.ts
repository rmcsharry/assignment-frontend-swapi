import { Action } from '@ngrx/store'

export const START_LOADER = '[Loader] START_LOADER'
export const STOP_LOADER = '[Loader] STOP_LOADER'

export class StartLoader implements Action {
  readonly type = START_LOADER;
}

export class StopLoader implements Action {
  readonly type = STOP_LOADER;
}

export type LoaderActions = StartLoader | StopLoader;
