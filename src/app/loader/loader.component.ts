import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';


@Component({
  selector: 'sw-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(
    private store: Store<fromApp.State>
  ) { }

  ngOnInit() {
    this.loading$ = this.store.select(fromApp.getIsLoading); // TODO: why does this not work?

    this.loading$ = this.store.pipe(map(state => {
      console.log('state received is', state);
      if (state.loader)
        return state.loader.isLoading
      else
        return true; // a hack TODO: why is this necessary when app.reducer has initialState defined?
    }));
  }

}
