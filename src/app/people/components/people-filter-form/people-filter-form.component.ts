import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Movie } from 'src/app/models/movie';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromInitData from '../../../store/reducers';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material';

@Component({
  selector: 'sw-people-filter-form',
  templateUrl: './people-filter-form.component.html',
  styleUrls: ['./people-filter-form.component.scss']
})
export class PeopleFilterFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('movieSelect', null) movieSelect: MatSelect;
  filterForm: FormGroup;
  movies: Movie[];
  selectedMovie: string;
  filteredMovies: ReplaySubject<Movie[]> = new ReplaySubject<Movie[]>(1);
  movieFilterCtrl: FormControl = new FormControl();

  protected onDestroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store<fromInitData.State>
  ) { }

  ngOnInit() {
    this.buildForm();
    this.store.pipe(select(fromInitData.getMovies))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (movies) => {
          this.movies = movies;
          this.filteredMovies.next(movies.slice());
        }
    );
    this.movieFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterMovies();
      });
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
    this.filteredMovies
      .pipe(take(1), takeUntil(this.onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // this needs to be done after the filteredMovies are loaded initially
        // and after the mat-option elements are available
        this.movieSelect.compareWith = (a: Movie, b: Movie) => a && b && a.url === b.url;
      });
  }

  protected filterMovies() {
    if (!this.movies) {
      return;
    }
    // get the search keyword
    let search = this.movieFilterCtrl.value;
    if (!search) {
      this.filteredMovies.next(this.movies.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the movies
    this.filteredMovies.next(
      this.movies.filter(movie => movie.title.toLowerCase().indexOf(search) > -1)
    );
  }
}
