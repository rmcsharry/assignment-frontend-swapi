import { Pipe, PipeTransform } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromPeople from '../people-store/reducers/people.reducer';

@Pipe({
  name: 'peopleFilter'
})
export class PeopleFilterPipe implements PipeTransform {

  constructor(
    private store: Store<fromPeople.State>
  ) {
  }
  transform(items: fromPeople.PeopleState): any[] {
    console.log('FILTER HERE ******', items)

    if (!items) return [];

    return items.results.filter(item => {
      return this.matchElement(item.species, "https://swapi.co/api/species/1/")
    });
  }

  private matchElement(items: string[], element: string): boolean {
    return items.indexOf(element) ? true : false
  }
}
