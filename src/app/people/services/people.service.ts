import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {map, tap, filter} from 'rxjs/operators';

import { Person } from '../models/person.model';
import { JsonApi } from '../../types/json-api.interface';
import * as fromPeople from '../reducers/people.reducer';
import { Store, select } from '@ngrx/store';
import { LoadPeoplePaged } from '../actions/people.actions';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private endPoint = 'people';

  constructor(
    private http: HttpClient,
    private store: Store<fromPeople.State>
  ) { }

  // pageOfPeople$ = (page: number) => this.store.select(fromPeople.getPeople)
  //   .pipe(tap(data => {
  //     if (data.page !== page || data.count === 0) {
  //       this.store.dispatch(new LoadPeoplePaged(page));
  //     };
  //   }),
  //     filter(data => data.results !== null)
  //   );

  getPeople(page: number = 1): Observable<JsonApi<Person[]>> {
    return this.http.get(`${this.endPoint}/?page=${page}`).pipe(
      map((response: JsonApi<Person[]>) => {
        return response
      })
    );
  }

  getPerson(id: number = 1): Observable<Person> {
    return this.http.get(`${this.endPoint}/${id}`).pipe(
      map((response: Person) => {
        return response
      })
    );
  }

}
