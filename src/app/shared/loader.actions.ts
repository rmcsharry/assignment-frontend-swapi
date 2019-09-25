import { Action } from '@ngrx/store'

export const START_LOADER = '[UILoader] START_LOADER'
export const STOP_LOADER = '[UILoader] STOP_LOADER'

export class StartLoader implements Action {
  readonly type = START_LOADER;
}

export class StopLoader implements Action {
  readonly type = STOP_LOADER;
}

export type LoaderActions = StartLoader | StopLoader;
