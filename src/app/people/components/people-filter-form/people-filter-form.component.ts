import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { MatSelect } from '@angular/material';

import * as fromInitData from '../../../store/reducers';
import * as fromPeople from '../../people-store/reducers/index';
import * as fromFilter from '../../people-store/reducers/filter.reducer';

import { Specie } from 'src/app/models/specie';
import { Movie } from 'src/app/models/movie';
import { SetPeopleFilter, SetPeopleSpeciesFilter } from '../../people-store/actions/filter.actions';
import { ENUM_FILTERTYPE_SPECIES } from '../../people-store/reducers/filter.reducer';

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
    this.store.pipe(select(fromPeople.getResetPeopleFilter))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (result) => {
          if (result) this.clearFilters();
        }
      );
  }

  clearFilters() {
    this.filterForm.controls['species'].setValue('');
    this.filterForm.controls['movie'].setValue('');
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

  onSpeciesSelected(data: Specie) {
    if (!data)
      this.store.dispatch(new SetPeopleSpeciesFilter({ filterValue: '' }));
      // this.store.dispatch(new SetPeopleFilter({ filter: { filterType: 'species', type: fromFilter.ENUM_FILTERTYPE_SPECIES, value: '' } }));
    else
      this.store.dispatch(new SetPeopleSpeciesFilter({ filterValue: data.url }));
      // this.store.dispatch(new SetPeopleFilter({ filter: { filterType: 'species', type: fromFilter.ENUM_FILTERTYPE_SPECIES, value: data.url } }));
  }

  onMovieSelected(data: Movie) {
    if (!data)
      this.store.dispatch(new SetPeopleFilter({ filter: { filterType: 'films', type: fromFilter.ENUM_FILTERTYPE_MOVIE, value: '' } }));
    else
      this.store.dispatch(new SetPeopleFilter({ filter: { filterType: 'films', type: fromFilter.ENUM_FILTERTYPE_MOVIE, value: data.url } }));
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
