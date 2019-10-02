import { Action } from '@ngrx/store';
import { PeopleFilter } from '../reducers/filter.reducer';

export const SET_PEOPLE_FILTER = '[People Filter] SET_PEOPLE_FILTER';
export const SET_PEOPLE_SPECIES_FILTER = '[People Filter] SET_PEOPLE_SPECIES_FILTER';
export const RESET_PEOPLE_FILTERS = '[People Filter] RESET_PEOPLE_FILTERS';

export class SetPeopleFilter implements Action {
  readonly type = SET_PEOPLE_FILTER;

  constructor(readonly payload: { filter: PeopleFilter } ) { }
}

export class SetPeopleSpeciesFilter implements Action {
  readonly type = SET_PEOPLE_SPECIES_FILTER;

  constructor(readonly payload: { filterValue: string } ) { }
}

export class ResetPeopleFilter implements Action {
  readonly type = RESET_PEOPLE_FILTERS;
}

export type FilterActions =
  SetPeopleSpeciesFilter |
  SetPeopleFilter | ResetPeopleFilter
