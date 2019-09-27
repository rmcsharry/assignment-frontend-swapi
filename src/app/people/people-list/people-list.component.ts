import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

import { PageService } from 'src/app/services/page.service';
import * as PeopleActions from '../actions/people.actions';
import * as fromPeople from '../reducers/people.reducer';

@Component({
  selector: 'sw-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
  people$: Observable<fromPeople.PeopleState>;
  page: number;

  constructor(
    private pageService: PageService,
    private store: Store<fromPeople.State>,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.store.pipe(select(state => state.people.page)).subscribe(
      (page: number) => this.page = page
    );
    this.pageService.setPageTitle('Character List');
    this.store.dispatch(new PeopleActions.LoadPeoplePaged(this.page))
    this.people$ = this.store.pipe(select(state => state.people));
  }

  onNextPage() {
    this.store.dispatch(new PeopleActions.LoadPeoplePaged(this.page + 1))
  }

  onPrevPage() {
    this.store.dispatch(new PeopleActions.LoadPeoplePaged(this.page - 1))
  }

  onSelectPerson(index: number) {
    this.store.dispatch(new PeopleActions.SetSelectedPerson(index));
    this.router.navigate(['characters', index + 1])
  }
}
