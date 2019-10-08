import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page.service';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { Person } from '../../models/person.model';
import * as fromPeople from '../../people-store/reducers/index';
import * as fromInitData from '../../../store/reducers';

@Component({
  selector: 'sw-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  person$: Observable<Person>;
  isInitLoadComplete$: Observable<boolean> = of(false);
  swapiId: string;

  constructor(
    private pageService: PageService,
    private route: ActivatedRoute,
    private store: Store<fromPeople.State>
  ) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      let index = +data['id'];
      this.pageService.setPageTitle(`Character ${index}`);
    });
    this.person$ = this.store.pipe(select(fromPeople.getCurrentPerson));
    this.store.pipe(select(fromPeople.getCurrentPersonSwapiId)).subscribe(
      (data) => this.swapiId = data
    );
    this.isInitLoadComplete$ = this.store.pipe(select(fromInitData.getIsInitLoadComplete));
  }

  getCharImageClass() {
    return this.swapiId;
  }

  isCharImageAvailable(): boolean {
    return ['1','2','3','4','5','10','13','14','20','21','22','84','85','87'].includes(this.swapiId);
  }

  getSpecies(url: string): Observable<any> {
    if (!url) return of({ name: 'unknown' });
    return  this.store.pipe(select(fromInitData.findASpecies(url)));
  }

  getStarships(url: string): Observable<any> {
    if (!url) return of({ name: 'unknown' });
    return  this.store.pipe(select(fromInitData.findAStarship(url)));
  }

  getMovies(url: string): Observable<any> {
    if (!url) return of({ name: 'unknown' });
    return  this.store.pipe(select(fromInitData.findAMovie(url)));
  }
}
