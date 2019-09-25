import {Component, OnInit, Input} from '@angular/core';
import {PeopleService} from '../../services/people.service';
import {PageService} from 'src/app/services/page.service';
import {Observable} from 'rxjs';
import {Person} from '../person.model';
import {JsonApi} from 'src/app/types/json-api.interface';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'sw-people-table',
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.scss']
})
export class PeopleTableComponent implements OnInit {
  @Input() people$: Observable<JsonApi<Person[]>>;

  nameFilter = new FormControl('');
  filmFilter = new FormControl('');
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['name', 'film'];

  filterValues = {
    name: '',
    film: '',
  };

  constructor(
    private pageService: PageService,
    private peopleService: PeopleService
  ) { }

  ngOnInit() {
    this.pageService.setPageTitle('Character Table');
    this.peopleService.getPeople().subscribe((data) => {
      this.dataSource.data = data['results']
      console.log(this.dataSource.data)
    });
    this.dataSource.filterPredicate = this.createFilter();
    this.setupFilters();
  }

  setupFilters() {
    this.nameFilter.valueChanges
      .subscribe(
        name => {
          this.filterValues.name = name;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.filmFilter.valueChanges
      .subscribe(
        film => {
          this.filterValues.film = film;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.name.toLowerCase().indexOf(searchTerms.name) !== -1
        && data.films.toString().toLowerCase().indexOf(searchTerms.film) !== -1
    }
    return filterFunction;
  }
}
