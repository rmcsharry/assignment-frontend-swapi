import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PeopleService } from '../services/people.service';
import { Person } from '../models/person.model';
import { JsonApi } from 'src/app/types/json-api.interface';
import { PageService } from 'src/app/services/page.service';
import * as People from '../actions/people.actions';
import * as fromPeople from '../reducers/people.reducer';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'sw-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
  // people$: Observable<JsonApi<Person[]>>;
  people$: Observable<fromPeople.PeopleState>;
  page: number;

  constructor(
    private pageService: PageService,
    private peopleService: PeopleService,
    private store: Store<fromPeople.State>,
    private router: Router
  ) {
    this.store.pipe(select(state => state.people.page)).subscribe(
      (page: number) => this.page = page
    );
  }

  ngOnInit() {
    this.pageService.setPageTitle('Character List');
    this.store.dispatch(new People.LoadPeoplePaged(this.page))
    this.people$ = this.store.pipe(select(state => state.people));
  }

  onNextPage(data) {
    console.log('data',data)
    this.store.dispatch(new People.LoadPeoplePaged(this.page + 1))
  }

  onPrevPage(data) {
    console.log('data',data)
    this.store.dispatch(new People.LoadPeoplePaged(this.page - 1))
  }

  onSelectPerson(index: number) {
    this.store.dispatch(new People.SelectPerson(index));
    this.router.navigate(['characters', index + 1])
  }
}
