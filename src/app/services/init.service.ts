import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { JsonApi } from '../types/json-api.interface';
import { Specie } from '../models/specie';
import { Starship } from '../models/starship';
import { Movie } from '../models/movie';

const SPECIES_ENDPOINT = 'species';
const MOVIES_ENDPOINT = 'films';
const STARSHIPS_ENDPOINT = 'starships';

@Injectable({
  providedIn: 'root'
})
export class InitService {


  constructor(
    private http: HttpClient,
  ) { }

  getSpecies(page: number): Observable<JsonApi<Specie>> {
    return this.http.get(`${SPECIES_ENDPOINT}/?page=${page}`).pipe(
      map((response: JsonApi<Specie>) => {
        return response
      })
    );
  }

  getMovies(page: number): Observable<JsonApi<Movie>> {
    return this.http.get(`${MOVIES_ENDPOINT}/?page=${page}`).pipe(
      map((response: JsonApi<Movie>) => {
        return response
      })
    );
  }

  getStarships(page: number): Observable<JsonApi<Starship>> {
    return this.http.get(`${STARSHIPS_ENDPOINT}/?page=${page}`).pipe(
      map((response: JsonApi<Starship>) => {
        return response
      })
    );
  }

}
