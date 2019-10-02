import { Component, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';

import * as PeopleActions from '../../people-store/actions/people.actions';
import * as fromPeople from '../../people-store/reducers/people.reducer';

@Component({
  selector: 'sw-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  constructor(
    private renderer: Renderer2,
    private store: Store<fromPeople.PeopleState>
  ) { }

  ngOnInit() {
    this.renderer.removeClass(document.body, 'intro');
    this.store.dispatch(new PeopleActions.LoadPageOfPeople({ page: 1 }));
  }

}
