import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/reducers';

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
