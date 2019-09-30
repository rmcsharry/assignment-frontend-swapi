import { Action } from '@ngrx/store'
import { JsonApi } from 'src/app/types/json-api.interface';
import { Specie } from 'src/app/models/specie';
import { Movie } from 'src/app/models/movie';
import { Starship } from 'src/app/models/starship';

export const STARTUP = '[Init] STARTUP';
export const LOAD_INIT_DATA = '[Init] LOAD_INIT_DATA';
export const LOAD_SPECIES_SUCCESS = '[Init] LOAD_SPECIES_SUCCESS';
export const LOAD_MOVIES_SUCCESS = '[Init] LOAD_MOVIES_SUCCESS';
export const LOAD_STARSHIPS_SUCCESS = '[Init] LOAD_STARSHIPS_SUCCESS';
export const LOAD_INIT_SUCCESS = '[Init] LOAD_INIT_SUCCESS';

export class StartUp implements Action {
  readonly type = STARTUP;
}

export class LoadInitData implements Action {
  readonly type = LOAD_INIT_DATA;

  constructor(public payload: {page: number, dataType: string }) { }
}

export class LoadInitSuccess implements Action {
  readonly type = LOAD_INIT_SUCCESS;
}

export class LoadSpeciesSuccess implements Action {
  readonly type = LOAD_SPECIES_SUCCESS;

  constructor(public payload: JsonApi<Specie>) { }
}

export class LoadMoviesSuccess implements Action {
  readonly type = LOAD_MOVIES_SUCCESS;

  constructor(public payload: JsonApi<Movie>) { }
}

export class LoadStarshipsSuccess implements Action {
  readonly type = LOAD_STARSHIPS_SUCCESS;

  constructor(public payload: JsonApi<Starship>) { }
}

export type InitActions = StartUp | LoadInitData | LoadInitSuccess | LoadSpeciesSuccess | LoadMoviesSuccess | LoadStarshipsSuccess;
