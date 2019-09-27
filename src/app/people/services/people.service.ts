import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Person } from '../models/person.model';
import { JsonApi } from '../../types/json-api.interface';
import * as People from '../actions/people.actions';
import * as fromPeople from '../reducers/people-data.reducer';
import { Store } from '@ngrx/store';
import { StartLoader } from 'src/app/shared/loader.actions';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(
    private http: HttpClient,
    private store: Store<fromPeople.State>
  ) { }

  getPeople(page: number = 1): Observable<JsonApi<Person[]>> {

    return this.http.get(`people/?page=${page}`).pipe(
      // tap((response: JsonApi<Person[]>) =>
      //   this.store.dispatch(new People.SetPeople(response))
      // ),
      map((response: JsonApi<Person[]>) => {
        return response
      })
    );
  }

}
