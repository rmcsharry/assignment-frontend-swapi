import { Action } from '@ngrx/store';

export const SET_PEOPLE_SPECIES_FILTER = '[People Filter] SET_PEOPLE_SPECIES_FILTER';
export const SET_PEOPLE_MOVIES_FILTER = '[People Filter] SET_PEOPLE_MOVIES_FILTER';

export class SetPeopleSpeciesFilter implements Action {
  readonly type = SET_PEOPLE_SPECIES_FILTER;

  constructor(readonly payload: { filterValue: string } ) { }
}

export class SetPeopleMoviesFilter implements Action {
  readonly type = SET_PEOPLE_MOVIES_FILTER;

  constructor(readonly payload: { filterValue: string } ) { }
}

export type FilterActions =
  SetPeopleSpeciesFilter | SetPeopleMoviesFilter
