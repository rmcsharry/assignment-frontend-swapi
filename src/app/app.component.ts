import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from './store/reducers';
import * as Loader from './store/actions/loader.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
  }
}
