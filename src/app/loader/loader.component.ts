import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { map } from 'rxjs/operators'


@Component({
  selector: 'sw-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loader$: Observable<boolean>;

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.loader$ = this.store.select(fromRoot.getIsLoading);
  }

}
