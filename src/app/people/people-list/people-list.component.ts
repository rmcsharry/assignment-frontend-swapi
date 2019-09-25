import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PeopleService } from '../../services/people.service';
import { Person } from '../person.model';
import { JsonApi } from 'src/app/types/json-api.interface';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'sw-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
  @Input() people$: Observable<JsonApi<Person[]>>;

  constructor(
    private pageService: PageService,
    private peopleService: PeopleService
  ) { }

  ngOnInit() {
    this.pageService.setPageTitle('Character List');
    this.people$ = this.peopleService.getPeople();
  }

}
