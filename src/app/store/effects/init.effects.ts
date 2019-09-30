import { asyncScheduler, of, EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, catchError, filter, switchMap } from 'rxjs/operators';

import {
  LoadInitData,
  LoadInitSuccess,
  LOAD_INIT_DATA,
  LOAD_SPECIES_SUCCESS,
  LOAD_MOVIES_SUCCESS,
  LOAD_STARSHIPS_SUCCESS,
  StartUp,
  STARTUP
} from '../actions/init.actions';
import { InitService } from 'src/app/services/init.service';
import { AppInitEffects } from './app-init.effects';
import * as fromInit from '../../store/reducers'

@Injectable()
export class InitEffects {

  constructor(
    private actions$: Actions,
    private initService: InitService,
    private store: Store<fromInit.State>
  ) { }

  init$ = createEffect(() => of(new AppInitEffects().ngrxOnInitEffects(), asyncScheduler));

  startup$ = createEffect(() => this.actions$.pipe(
    ofType<StartUp>(STARTUP),
    switchMap(() => [
      new LoadInitData({ page: 1, dataType: 'species' }),
      new LoadInitData({ page: 1, dataType: 'movies' }),
      new LoadInitData({ page: 1, dataType: 'starships' })
    ]))
  );

  loadSpecies$ = createEffect(() => this.actions$.pipe(
    ofType<LoadInitData>(LOAD_INIT_DATA),
    filter((action: LoadInitData) => {
      return action.payload.dataType === 'species'
    }),
    mergeMap((data) => this.initService.getSpecies(data.payload.page).pipe(
      map(apiData => {
        if (!apiData.next) {
          // no more pages, so we can send success
          this.store.dispatch(new LoadInitSuccess());
        }
        else {
          this.store.dispatch(new LoadInitData({ page: data.payload.page + 1, dataType: 'species' }))
        };
        return ({ type: LOAD_SPECIES_SUCCESS, payload: apiData })
      }),
      catchError(() => EMPTY)
    ))
  ));

  loadMovies$ = createEffect(() => this.actions$.pipe(
    ofType<LoadInitData>(LOAD_INIT_DATA),
    filter((action: LoadInitData) => {
      return action.payload.dataType === 'movies'
    }),
    mergeMap((data) => this.initService.getMovies(data.payload.page).pipe(
      map(apiData => {
        if (!apiData.next) {
          // no more pages, so we can send success
          this.store.dispatch(new LoadInitSuccess());
        }
        else {
          this.store.dispatch(new LoadInitData({ page: data.payload.page + 1, dataType: 'movies' }))
        };
        return ({ type: LOAD_MOVIES_SUCCESS, payload: apiData })
      }),
      catchError(() => EMPTY)
    ))
  ));

  loadStarships$ = createEffect(() => this.actions$.pipe(
    ofType<LoadInitData>(LOAD_INIT_DATA),
    filter((action: LoadInitData) => {
      return action.payload.dataType === 'starships'
    }),
    mergeMap((data) => this.initService.getStarships(data.payload.page).pipe(
      map(apiData => {
        if (!apiData.next) {
          // no more pages, so we can send success
          this.store.dispatch(new LoadInitSuccess());
        }
        else {
          this.store.dispatch(new LoadInitData({ page: data.payload.page + 1, dataType: 'starships' }))
        };
        return ({ type: LOAD_STARSHIPS_SUCCESS, payload: apiData })
      }),
      catchError(() => EMPTY)
    ))
  ));
}
