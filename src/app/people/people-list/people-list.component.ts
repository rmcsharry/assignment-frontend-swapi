import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { PeopleService } from '../people.service';
import { People } from '../people.model';
import { JsonApi } from 'src/app/types/json-api.interface';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
  people$: Observable<JsonApi<People[]>>;

  constructor(
    private peopleService: PeopleService
  ) { }

  ngOnInit() {
    this.people$ = this.peopleService.getPeople();
    // deliberate delay to ensure loading animation is seen at least once! Got to flaunt it ;)
    // setTimeout(() => {
    //   this.people$ = this.peopleService.getPeople();
    // }, 2500);
  }

}
