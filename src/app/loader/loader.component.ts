import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer'

@Component({
  selector: 'sw-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(
    private store: Store<{ app: fromApp.State }>
  ) { }

  ngOnInit() {
    this.loading$ = this.store.pipe(map(state => {
      console.log('state received is', state);
      if (state.app)
        return state.app.isLoading
      else
        return true; // hack TODO: why is this necessary when app.reducer has initialState defined?
    }));
  }

}
