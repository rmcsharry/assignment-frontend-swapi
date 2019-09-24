import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {
  people$: Observable<any[]>;

  constructor(
    private _renderer: Renderer2
  ) { }

  ngOnInit() {

  }

}
