import { Component, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PeopleActions from '../actions/people.actions';
import * as fromPeople from '../reducers/people.reducer';

@Component({
  selector: 'sw-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  numberOfPages = 3;

  constructor(
    private renderer: Renderer2,
    private store: Store<fromPeople.PeopleState>
  ) { }

  ngOnInit() {
    this.renderer.removeClass(document.body, 'intro');
    for (let i = 1; i <= this.numberOfPages; i++) {
      this.store.dispatch(new PeopleActions.LoadPeoplePaged({ page: i, numberOfPages: this.numberOfPages }));
    };
  }

}
