import { Action } from '@ngrx/store';
import { Person } from '../models/person.model';
import { JsonApi } from '../../types/json-api.interface';

export const LOAD_PEOPLE_SUCCESS = '[People Paged] LOAD_PEOPLE_SUCCESS';
export const LOAD_PEOPLE_PAGED = '[People Paged] LOAD_PEOPLE_PAGED';
export const SET_SELECTED_PERSON = '[People] SET_SELECTED_PERSON';
export const LOAD_PERSON = '[People] LOAD_PERSON';
export const LOAD_PERSON_SUCCESS = '[People Paged] LOAD_PERSON_SUCCESS';

export class LoadPeoplePaged implements Action {
  readonly type = LOAD_PEOPLE_PAGED;

  constructor(readonly page: number) { }
}

export class LoadPeopleSuccess implements Action {
  readonly type = LOAD_PEOPLE_SUCCESS;

  constructor(public payload: JsonApi<Person[]>, public page: number) { }
}

export class LoadPerson implements Action {
  readonly type = LOAD_PERSON;

  constructor(readonly id: number) { }
}

export class LoadPersonSuccess implements Action {
  readonly type = LOAD_PERSON_SUCCESS;

  constructor(public payload: Person, public page: number) { }
}

export class SetSelectedPerson implements Action {
  readonly type = SET_SELECTED_PERSON;

  constructor(public payload: number) { }
}

export type PeopleActions = SetSelectedPerson | LoadPerson | LoadPersonSuccess | LoadPeoplePaged | LoadPeopleSuccess;
