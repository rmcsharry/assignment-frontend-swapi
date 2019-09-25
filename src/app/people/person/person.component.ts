import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import { Observable } from 'rxjs';
import { Person } from '../person.model';

@Component({
  selector: 'sw-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  person$: Observable<Person>;

  constructor(
    private pageService: PageService,
    private store: Store<fromApp.State>
  ) { }

  ngOnInit() {
    this.pageService.setPageTitle("Character");
    // this.person$ = this.store.select(fromApp.getSelectedPerson);
  }

}
