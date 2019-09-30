import { OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { STARTUP } from '../actions/init.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class AppInitEffects implements OnInitEffects {

  constructor(
  ) { }

  ngrxOnInitEffects(): Action {
    return { type: STARTUP };
  }
}
