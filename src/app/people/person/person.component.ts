import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { Observable } from 'rxjs';
import { Person } from '../models/person.model';
import { ActivatedRoute } from '@angular/router';
import * as People from '../actions/people.actions';

@Component({
  selector: 'sw-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  person$: Observable<Person>;

  constructor(
    private pageService: PageService,
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      let index = +data['id'];
      this.pageService.setPageTitle(`Character ${index}`);
      this.store.dispatch(new People.SelectPerson(index - 1));
      // this.ticket$ = this.backendService.ticket(+data['id'])
      //   .pipe(
      //     tap(t => this.assignee$ = this.getUser(t.assigneeId))
      //   )
    });
    // this.person$ = this.store.select(fromPeople.getSelectedPerson);
  }

}
