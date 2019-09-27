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

  constructor(
    private pageService: PageService,
    private peopleService: PeopleService,
    private store: Store<fromPeople.State>,
    private router: Router
  ) { }

  ngOnInit() {
    this.pageService.setPageTitle('Character List');
    // this.store.dispatch({ type: '[People Page] Load People', page: 1 })


    this.store.dispatch(new People.LoadPeoplePaged(1))
    // this.people$ = this.peopleService.getPeople();
    this.people$ = this.store.pipe(select(state => state.people));

    // this.people$ = this.store.pipe(map(state => {
    //   console.log('WTF', state)

    //     console.log('PEOPLE-LIST - state received is', state);
    //     return state['people']
    // }));
  }

  onSelectPerson(index: number) {
    // this.store.dispatch(new People.SelectPerson(index));
    this.router.navigate(['characters', index + 1])
  }
}
