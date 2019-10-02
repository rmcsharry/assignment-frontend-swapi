import {
  PeopleActions,
  SET_CURRENT_PERSON,
  LOAD_PERSON_SUCCESS,
  LOAD_ALL_PEOPLE_SUCCESS,
  LOAD_PAGE_OF_PEOPLE_SUCCESS
} from '../actions/people.actions';
import { Person } from '../../models/person.model';

export interface PeopleState {
  results: Person[]
  count: number
  next: string
  previous: string
  page: number
  currentPerson: Person
  currentPersonId: string
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
  currentPersonId: '',
  allLoaded: false,
  totalPages: 0,
}

export function peopleReducer(state = initialState, action: PeopleActions) {
  switch (action.type) {
    case LOAD_PAGE_OF_PEOPLE_SUCCESS:
      return {
        ...state,
        results: [...state.results, ...action.payload.results],
        count: state.count + action.payload.results.length,
        next: action.payload.next,
        previous: action.payload.previous,
      }
    case LOAD_ALL_PEOPLE_SUCCESS:
      return {
        ...state,
        allLoaded: true,
        totalPages: action.payload.totalPages
      };
    case SET_CURRENT_PERSON:
      return {
        ...state,
        currentPerson: findPerson(state, action.payload.swapiId),
        currentPersonId: action.payload.swapiId
      };
    case LOAD_PERSON_SUCCESS:
      return {
        ...state,
        currentPerson: action.payload.person,
        currentPersonId: action.payload.swapiId
      };
    default:
      return state;
  }
}

// export const peopleFeatureKey = 'people';

// function findPerson(state: PeopleState, index: number): Person | null {
//   if (state.results.length === 0) {
//     console.warn('NO DATA but tried to set person ', index);
//     return null;
//   } else
//     return state.results[index - 1];
// }

function findPerson(state: PeopleState, swapiId: string): Person | null {
  if (state.results.length === 0) {
    console.warn('NO DATA but tried to set person ', swapiId);
    return null;
  } else {
      return state.results.find(item => {
        if (item) return item.url.includes(swapiId);
      });
  };
}
