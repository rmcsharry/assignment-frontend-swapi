import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Movie } from 'src/app/models/movie';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromInitData from '../../../store/reducers';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material';
import { Specie } from 'src/app/models/specie';

@Component({
  selector: 'sw-people-filter-form',
  templateUrl: './people-filter-form.component.html',
  styleUrls: ['./people-filter-form.component.scss']
})
export class PeopleFilterFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('speciesSelect', null) speciesSelect: MatSelect;
  filterForm: FormGroup;
  movies$: Observable<Movie[]>;
  selectedSpecies: string;
  filteredSpecies$: ReplaySubject<Specie[]> = new ReplaySubject<Specie[]>(1);
  speciesFilterCtrl: FormControl = new FormControl();
  species: Specie[];
  speciesCtrl: FormControl = new FormControl();

  protected onDestroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store<fromInitData.State>
  ) { }

  ngOnInit() {
    this.buildForm();
    this.store.pipe(select(fromInitData.getSpecies))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (species: Specie[]) => {
          this.species = species;
          this.filteredSpecies$.next(species.slice());
        }
    );
    this.speciesFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterSpecies();
      });
    this.movies$ = this.store.pipe(select(fromInitData.getMovies));
  }

  ngAfterViewInit() {
    this.setCompareFunction();
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  buildForm() {
    this.filterForm = this.fb.group({
      'species': [''],
      'movie': ['']
    })
  }

  protected setCompareFunction() {
    this.filteredSpecies$
      .pipe(take(1), takeUntil(this.onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // this needs to be done after the filteredSpecies are loaded initially
        // and after the mat-option elements are available
        this.speciesSelect.compareWith = (a: Specie, b: Specie) => a && b && a.url === b.url;
      });
  }

  protected filterSpecies() {
    // guard against data not arrived
    if (!this.species) {
      return;
    }
    // get the search keyword
    let search = this.speciesFilterCtrl.value;
    if (!search) {
      this.filteredSpecies$.next(this.species.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredSpecies$.next(
      this.species.filter(item => item.name.toLowerCase().indexOf(search) > -1)
    );
  }
}
