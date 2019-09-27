import { Action } from '@ngrx/store'
import { Person } from '../models/person.model';
import { JsonApi } from '../../types/json-api.interface';

export const LOAD_PEOPLE_SUCCESS = '[People Paged] LOAD_PEOPLE_SUCCESS'
export const LOAD_PEOPLE_PAGED = '[People Paged] LOAD_PEOPLE_PAGED'

export class LoadPeoplePaged implements Action {
  readonly type = LOAD_PEOPLE_PAGED;

  constructor(readonly page: number) {}
}

export class LoadPeopleSuccess implements Action {
  readonly type = LOAD_PEOPLE_SUCCESS;

  constructor(public payload: JsonApi<Person[]>, public page: number) { }
}

export type PeopleActions = LoadPeoplePaged | LoadPeopleSuccess;
