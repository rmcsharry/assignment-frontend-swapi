import { Component, OnInit, Renderer2 } from '@angular/core';
import {PeopleService} from '../services/people.service';
import {Observable} from 'rxjs';
import {Person} from '../models/person.model';
import {JsonApi} from 'src/app/types/json-api.interface';

@Component({
  selector: 'sw-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.renderer.removeClass(document.body, 'intro');
  }

}
