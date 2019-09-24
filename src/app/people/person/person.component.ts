import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'sw-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  constructor(
    private pageService: PageService
  ) { }

  ngOnInit() {
    this.pageService.setPageTitle("Character");
  }

}
