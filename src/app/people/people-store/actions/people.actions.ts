import { Action } from '@ngrx/store';
import { Person } from '../../models/person.model';
import { JsonApi } from '../../../types/json-api.interface';

export const LOAD_ALL_PEOPLE_SUCCESS = '[People Paged] LOAD_ALL_PEOPLE_SUCCESS';
export const LOAD_ALL_SUCCESS = '[People Paged] LOAD_ALL_SUCCESS';
export const LOAD_PEOPLE_SUCCESS = '[People Paged] LOAD_PEOPLE_SUCCESS';
export const GET_PAGE_OF_PEOPLE = '[People Paged] GET_PAGE_OF_PEOPLE';

export const SET_CURRENT_PERSON = '[People] SET_CURRENT_PERSON';
export const LOAD_PERSON = '[People] LOAD_PERSON';
export const LOAD_PERSON_SUCCESS = '[People Paged] LOAD_PERSON_SUCCESS';

export class LoadAllPeople implements Action {
  readonly type = LOAD_ALL_PEOPLE_SUCCESS;

  constructor(readonly payload: { page: number } ) { }
}

export class LoadAllPeopleSuccess implements Action {
  readonly type = LOAD_ALL_SUCCESS;

  constructor(readonly payload: { totalPages: number } ) { }
}

export class LoadPeopleSuccess implements Action {
  readonly type = LOAD_PEOPLE_SUCCESS;

  constructor(public payload: JsonApi<Person>) { }
}

export class LoadPerson implements Action {
  readonly type = LOAD_PERSON;

  constructor(readonly payload: { internalId: number } ) { }
}

export class LoadPersonSuccess implements Action {
  readonly type = LOAD_PERSON_SUCCESS;

  constructor(public payload: { person: Person, id: number }) { }
}

export class SetCurrentPerson implements Action {
  readonly type = SET_CURRENT_PERSON;

  constructor(public payload: { internalId: number } ) { }
}

export type PeopleActions =
  LoadAllPeople | LoadAllPeopleSuccess | LoadPeopleSuccess |
  LoadPerson | LoadPersonSuccess | SetCurrentPerson;
