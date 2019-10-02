import {
  PeopleActions,
  SET_CURRENT_PERSON,
  LOAD_PEOPLE_SUCCESS,
  LOAD_PERSON_SUCCESS,
  LOAD_ALL_SUCCESS
} from '../actions/people.actions';
import { Person } from '../../models/person.model';

export interface PeopleState {
  results: Person[]
  count: number
  next: string
  previous: string
  page: number
  currentPerson: Person
  currentPersonId: number
  allLoaded: boolean
  totalPages: number
}

const initialState: PeopleState = {
  results: [],
  count: 0,
  next: null,
  previous: null,
  page: 0,
  currentPerson: null,
  currentPersonId: 0,
  allLoaded: false,
  totalPages: 0,
}

export function peopleReducer(state = initialState, action: PeopleActions) {
  switch (action.type) {
    case LOAD_PEOPLE_SUCCESS:
      return {
        ...state,
        results: [...state.results, ...action.payload.results],
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
      }
    case LOAD_ALL_SUCCESS:
      return {
        ...state,
        allLoaded: true,
        totalPages: action.payload.totalPages
      };
    case SET_CURRENT_PERSON:
      return {
        ...state,
        currentPerson: findPerson(state, action.payload.internalId),
        currentPersonId: action.payload.internalId
      };
    case LOAD_PERSON_SUCCESS:
      return {
        ...state,
        currentPerson: action.payload.person,
        currentPersonId: action.payload.id
      };
    default:
      return state;
  }
}

// export const peopleFeatureKey = 'people';

function findPerson(state: PeopleState, index: number): Person | null {
  if (state.results.length === 0) {
    console.warn('NO DATA but tried to set person ', index);
    return null;
  } else
    return state.results[index - 1];
}
