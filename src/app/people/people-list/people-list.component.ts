import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PeopleService } from '../../services/people.service';
import { People } from '../people.model';
import { JsonApi } from 'src/app/types/json-api.interface';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'sw-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
  @Input() people$: Observable<JsonApi<People[]>>;

  constructor(
    private pageService: PageService,
    private peopleService: PeopleService
  ) { }

  ngOnInit() {
    this.pageService.setPageTitle('Character List');
    this.people$ = this.peopleService.getPeople();
    // deliberate delay to ensure loading animation is seen at least once! Got to flaunt it ;)
    // setTimeout(() => {
    //   this.people$ = this.peopleService.getPeople();
    // }, 2500);
  }

}
