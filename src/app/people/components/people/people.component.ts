import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as PeopleActions from '../../people-store/actions/people.actions';
import * as fromPeople from '../../people-store/reducers/index';
import {Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sw-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit, OnDestroy {

  protected onDestroy = new Subject<void>();

  constructor(
    private renderer: Renderer2,
    private store: Store<fromPeople.LazyPeopleState>
  ) { }

  ngOnInit() {
    this.renderer.removeClass(document.body, 'intro');
    this.store.pipe(select(fromPeople.getIsAllLoaded))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
      (result) => {
        if (!result)
          this.store.dispatch(new PeopleActions.LoadPageOfPeople({ page: 1 }));
      }
    )
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
