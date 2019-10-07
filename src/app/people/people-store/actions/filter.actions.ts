import { Action } from '@ngrx/store';

export const SET_PEOPLE_SPECIES_FILTER = '[People Filter] SET_PEOPLE_SPECIES_FILTER';
export const SET_PEOPLE_MOVIES_FILTER = '[People Filter] SET_PEOPLE_MOVIES_FILTER';
export const SET_PEOPLE_BORN_FROM_FILTER = '[People Filter] SET_PEOPLE_BORN_FROM_FILTER';
export const SET_PEOPLE_BORN_TO_FILTER = '[People Filter] SET_PEOPLE_BORN_TO_FILTER';

export class SetPeopleSpeciesFilter implements Action {
  readonly type = SET_PEOPLE_SPECIES_FILTER;

  constructor(readonly payload: { filterValue: string } ) { }
}

export class SetPeopleMoviesFilter implements Action {
  readonly type = SET_PEOPLE_MOVIES_FILTER;

  constructor(readonly payload: { filterValue: string } ) { }
}

export class SetPeopleBornFromFilter implements Action {
  readonly type = SET_PEOPLE_BORN_FROM_FILTER;

  constructor(readonly payload: { filterValue: number } ) { }
}

export class SetPeopleBornToFilter implements Action {
  readonly type = SET_PEOPLE_BORN_TO_FILTER;

  constructor(readonly payload: { filterValue: number } ) { }
}

export type FilterActions =
  SetPeopleSpeciesFilter | SetPeopleMoviesFilter | SetPeopleBornFromFilter | SetPeopleBornToFilter
