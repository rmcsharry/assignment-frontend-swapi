import { Component, OnInit } from '@angular/core';
import {PeopleService} from '../../services/people.service';
import {Observable} from 'rxjs';
import {People} from '../people.model';
import {JsonApi} from 'src/app/types/json-api.interface';

@Component({
  selector: 'sw-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {

  }

}
