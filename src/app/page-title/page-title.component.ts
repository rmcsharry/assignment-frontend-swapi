import { Component, OnInit } from '@angular/core';
import { PageService } from '../services/page.service';

@Component({
  selector: 'sw-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit {
  pageTitle: string = '';

  constructor(
    private pageService: PageService
  ) { }

  ngOnInit() {
    this.pageService.getPageTitle.subscribe(data => this.pageTitle = data);
  }

}
