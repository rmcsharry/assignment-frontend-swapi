import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { map, take, takeLast } from 'rxjs/operators';

import { PageService } from 'src/app/services/page.service';
import * as PeopleActions from '../../store/actions/people.actions';
import * as fromPeople from '../../store/reducers/people.reducer';
import { StopLoader } from 'src/app/store/actions/loader.actions';

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
    this.store.select(fromPeople.getIsAllLoaded).subscribe(
      (allLoaded: boolean) => {
        console.log('*** DATA is', allLoaded)
        if (allLoaded) {
          this.getPeople();
        };
      }
    );
  }

  private getPeople(): void {
    this.people$ = this.store.select(fromPeople.getPeople).pipe(
      map((state) => {
        this.page = state.page;

        return {
          count: state.count,
          results: state.results.slice((state.page * this.pageSize) - this.pageSize, this.pageSize * state.page),
          page: state.page,
          next: state.next,
          previous: state.previous,
          currentPerson: state.currentPerson,
          currentPersonId: state.currentPersonId,
          allLoaded: state.allLoaded,
          totalPages: state.totalPages
        };
      })
    );
  }

  onNextPage() {
    this.store.dispatch(new PeopleActions.SetPeoplePageNumer({ page: this.page + 1 }))
  }

  onPrevPage() {
    this.store.dispatch(new PeopleActions.SetPeoplePageNumer({ page: this.page - 1 }))
  }

  onSelectPerson(index: number, url: string) {
    this.store.dispatch(new PeopleActions.SetCurrentPerson({ internalId: this.personNumber(index) }));
    this.router.navigate(['characters', this.personNumber(index)], { queryParams: { swapiId: this.personUrlId(url) }})
  }

  personNumber(index: number): number {
    return (this.page - 1) * this.pageSize + index + 1;
  }

  personUrlId(url: string): string {
    return url.slice(url.lastIndexOf('/', url.lastIndexOf('/') - 1) + 1, url.length - 1)
  }

  // reactive onClick handler
  // onClick$ = new Subject<Whatever>();

  // constructor(private _store: Store<AppState>) {
  //   this.onClick$
  //     .withLatestFrom(this._store)
  //     .subscribe(([data, state]) => {
  //       // do whatever you want here
  //     });
  // }
}
