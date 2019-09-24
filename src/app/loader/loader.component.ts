import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'sw-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.loading$ = this.loaderService.getLoader();
  }

}
