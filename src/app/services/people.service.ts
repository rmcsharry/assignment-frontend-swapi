import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../people/person.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JsonApi } from '../types/json-api.interface';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(
    private http: HttpClient,
  ) { }

  getPeople(): Observable<JsonApi<Person[]>> {
    return this.http.get('people').pipe(
      map((response: JsonApi<Person[]>) => response)
    )
  }

}
