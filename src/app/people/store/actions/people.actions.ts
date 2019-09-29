import { Action } from '@ngrx/store';
import { Person } from '../../models/person.model';
import { JsonApi } from '../../../types/json-api.interface';

export const LOAD_PEOPLE_PAGED = '[People Paged] LOAD_PEOPLE_PAGED';
export const LOAD_PEOPLE_SUCCESS = '[People Paged] LOAD_PEOPLE_SUCCESS';
export const GET_PAGE_OF_PEOPLE = '[People Paged] GET_PAGE_OF_PEOPLE';
export const SET_PEOPLE_PAGE_NUMBER = '[People Paged] SET_PEOPLE_PAGE_NUMBER';

export const SET_CURRENT_PERSON = '[People] SET_CURRENT_PERSON';
export const LOAD_PERSON = '[People] LOAD_PERSON';
export const LOAD_PERSON_SUCCESS = '[People Paged] LOAD_PERSON_SUCCESS';

export class LoadPeoplePaged implements Action {
  readonly type = LOAD_PEOPLE_PAGED;

  constructor(readonly payload: { page: number, numberOfPages: number } ) { }
}

export class LoadPeopleSuccess implements Action {
  readonly type = LOAD_PEOPLE_SUCCESS;

  constructor(public payload: JsonApi<Person[]>) { }
}

export class SetPeoplePageNumer implements Action {
  readonly type = SET_PEOPLE_PAGE_NUMBER;

  constructor(readonly payload: { page: number } ) { }
}

export class LoadPerson implements Action {
  readonly type = LOAD_PERSON;

  constructor(readonly payload: { id: number } ) { }
}

export class LoadPersonSuccess implements Action {
  readonly type = LOAD_PERSON_SUCCESS;

  constructor(public payload: Person, public page: number) { }
}

export class SetCurrentPerson implements Action {
  readonly type = SET_CURRENT_PERSON;

  constructor(public payload: { id: number } ) { }
}

export type PeopleActions =
  LoadPeoplePaged | LoadPeopleSuccess | SetPeoplePageNumer |
  LoadPerson | LoadPersonSuccess | SetCurrentPerson;
