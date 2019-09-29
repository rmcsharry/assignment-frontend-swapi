import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, tap, filter, take } from 'rxjs/operators';

import * as fromPeople from '../../store/reducers/people.reducer'
import * as PeopleActions from '../../store/actions/people.actions';

@Injectable({
  providedIn: 'root'
})
export class PersonGuard implements CanActivate {

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromPeople.PeopleState>
  ) { }

  // wrapping the logic so we can .switchMap() it
  getFromStoreOrAPI(): Observable<any> {
    // return an Observable stream from the store
    return this.store.pipe(
      // selecting the person state using a feature selector
      select(fromPeople.getPerson),
      // the .tap() operator allows for a side effect, at this
      // point, I'm checking if the person property exists on my
      // Store slice of state
      tap((data: any) => {
        console.log('GUARD ----,', data)
        // if there is no person, dispatch an action to hit the backend
        if (!data) {
          this.store.dispatch(new PeopleActions.LoadPerson(+this.route.snapshot.params.get('id')));
        }
      }),
      // filter out data, no data === empty!
      filter((data: any) => data),
      // which if empty, we will never .take()
      // take 1 value from the Observable then complete
      // which does our unsubscribing, technically.
      take(1)
    );
  }

  // our guard that gets called each time we
  // navigate to a new route
  canActivate(): Observable<boolean> {
    // return our Observable stream from above
    return this.getFromStoreOrAPI().pipe(
      // if it was successful, we can return Observable.of(true)
      switchMap(() => of(true)),
      // otherwise, something went wrong
      catchError(() => of(false)));
  }
}
