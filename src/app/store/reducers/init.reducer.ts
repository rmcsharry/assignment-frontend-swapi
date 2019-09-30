import { InitActions, LOAD_SPECIES_SUCCESS, LOAD_MOVIES_SUCCESS, LOAD_STARSHIPS_SUCCESS, LOAD_INIT_SUCCESS} from '../actions/init.actions';
import { Specie } from 'src/app/models/specie';
import { Movie } from 'src/app/models/movie';
import { Starship } from 'src/app/models/starship';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromRoot from '../reducers';

export interface InitState  {
  species: Specie[];
  movies: Movie[];
  starships: Starship[];
  initLoadedCounter: number; // used to count how many initial entity loads have completed
}
const initialState: InitState = {
  species: [],
  movies: [],
  starships: [],
  initLoadedCounter: 0
}

export function initReducer(state: InitState = initialState, action: InitActions) {
  switch (action.type) {
    case LOAD_SPECIES_SUCCESS:
      return {
        ...state,
        species: [...state.species, ...action.payload.results]
      };
    case LOAD_MOVIES_SUCCESS:
      return {
        ...state,
        movies: [...state.movies, ...action.payload.results]
      };
    case LOAD_STARSHIPS_SUCCESS:
      return {
        ...state,
        starships: [...state.starships, ...action.payload.results]
      };
    case LOAD_INIT_SUCCESS:
      return {
        ...state,
        initLoadedCounter: state.initLoadedCounter + 1
      }
    default:
      return state;
  }
}
