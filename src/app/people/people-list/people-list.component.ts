import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { PageService } from 'src/app/services/page.service';
import * as PeopleActions from '../store/actions/people.actions';
import * as fromPeople from '../store/reducers/people.reducer';



@Component({
  selector: 'sw-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
  @Input() numberOfPages: number = 1;
  people$: Observable<fromPeople.PeopleState>;
  page: number;
  pageSize = 10;

  constructor(
    private pageService: PageService,
    private store: Store<fromPeople.PeopleState>,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.pageService.setPageTitle('Character List');
    this.people$ = this.store.pipe(select(fromPeople.getPeople))
      .pipe(map((state) => {
        this.page = state.page;
        console.log('DATA HOT******', state)
        return {
          count: state.count,
          results: state.results.slice((state.page * this.pageSize) - this.pageSize, this.pageSize * state.page),
          page: state.page,
          next: state.next,
          previous: state.previous,
          selectedPerson: state.selectedPerson
        }
      }))
  }

  onNextPage() {
    this.store.dispatch(new PeopleActions.SetPeoplePageNumer({ page: this.page + 1 }))
  }

  onPrevPage() {
    this.store.dispatch(new PeopleActions.SetPeoplePageNumer({ page: this.page -1 }))
  }

  onSelectPerson(index: number) {
    this.store.dispatch(new PeopleActions.SetSelectedPerson(index));
    this.router.navigate(['characters', this.personNumber(index)])
  }

  personNumber(index: number): number {
    return (this.page - 1) * this.pageSize + index + 1;
  }
}
