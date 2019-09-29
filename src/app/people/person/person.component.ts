import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Person } from '../models/person.model';
import { ActivatedRoute } from '@angular/router';
import * as fromPeople from '../store/reducers/people.reducer';

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
    private store: Store<fromPeople.State>
  ) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      let index = +data['id'];
      this.pageService.setPageTitle(`Character ${index}`);
    });
    this.person$ = this.store.pipe(
      select(fromPeople.selectCurrentPerson)
    );
  }

}
