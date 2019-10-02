import { Action } from '@ngrx/store';
import { PeopleFilter } from '../reducers/filter.reducer';

export const SET_PEOPLE_FILTER = '[People Filter] SET_PEOPLE_FILTER';
export const RESET_PEOPLE_FILTER = '[People Filter] RESET_PEOPLE_FILTER';

export class SetPeopleFilter implements Action {
  readonly type = SET_PEOPLE_FILTER;

  constructor(readonly payload: { filter: PeopleFilter } ) { }
}

export class ResetPeopleFilter implements Action {
  readonly type = RESET_PEOPLE_FILTER;
}

export type FilterActions =
  SetPeopleFilter | ResetPeopleFilter
