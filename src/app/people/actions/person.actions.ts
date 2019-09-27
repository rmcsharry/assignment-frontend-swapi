import {Action} from '@ngrx/store';

export const SELECT_PERSON = '[People] SELECT_PERSON'
export const UNSELECT_PERSON = '[People] UNSELECT_PERSON'

export class SelectPerson implements Action {
  readonly type = SELECT_PERSON;

  constructor(public payload: number) { }
}

export class UnselectPerson implements Action {
  readonly type = UNSELECT_PERSON;
}

export type PeopleActions = SelectPerson | UnselectPerson;
