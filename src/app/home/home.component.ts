import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PageService} from '../services/page.service';

@Component({
  selector: 'sw-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private pageService: PageService
  ) {}

  ngOnInit() {
    this.pageService.setPageTitle('rocketLoop assignment');
  }

  onStart(event: Event) {
    this.router.navigate(['intro']);
  }

}
