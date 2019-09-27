import { Action } from '@ngrx/store'
import { Person } from '../models/person.model';
import { JsonApi } from '../../types/json-api.interface';

export const SET_PEOPLE = '[People] SET_PEOPLE'
export const SELECT_PERSON = '[People] SELECT_PERSON'
export const UNSELECT_PERSON = '[People] UNSELECT_PERSON'

export const LOAD_PEOPLE_SUCCESS = '[People Paged] LOAD_PEOPLE_SUCCESS'
export const LOAD_PEOPLE_PAGED = '[People Paged] LOAD_PEOPLE_PAGED'

export const SET_PEOPLE_PAGE_NUMBER = '[People Paged] SET_PEOPLE_PAGE_NUMBER'

export class SetPeoplePageNumber implements Action {
  readonly type = SET_PEOPLE_PAGE_NUMBER

  constructor(readonly page: number) {}
}

export class LoadPeoplePaged implements Action {
  readonly type = LOAD_PEOPLE_PAGED;

  constructor(readonly page: number) {}
}

export class LoadPeopleSuccess implements Action {
  readonly type = LOAD_PEOPLE_SUCCESS;

  constructor(public payload: JsonApi<Person[]>, public page: number) { }
}

export class SetPeople implements Action {
  readonly type = SET_PEOPLE;

  constructor(public payload: JsonApi<Person[]>) { }
}

export class SelectPerson implements Action {
  readonly type = SELECT_PERSON;

  constructor(public payload: number) { }
}

export class UnselectPerson implements Action {
  readonly type = UNSELECT_PERSON;
}

export type PeopleActions =  SetPeoplePageNumber | LoadPeoplePaged | LoadPeopleSuccess | SetPeople | SelectPerson | UnselectPerson;
