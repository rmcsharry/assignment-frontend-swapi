import {Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {Store, select} from '@ngrx/store';
import * as fromInitData from '../../../../store/reducers';
import * as FilterActions from '../../../people-store/actions/filter.actions'
import {takeUntil} from 'rxjs/operators';
import * as fromPeople from '../../../people-store/reducers/index';
import {Subject} from 'rxjs';

@Component({
  selector: 'sw-birth-year-filter',
  templateUrl: './birth-year-filter.component.html',
  styleUrls: ['./birth-year-filter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: BirthYearFilterComponent,
      multi: true
    }
  ]
})
export class BirthYearFilterComponent implements OnInit, ControlValueAccessor, OnDestroy {
  public yearFiltersForm: FormGroup;
  swFromBYFactor: number = -1; // used to separate years: BBY (-1) from ABY (1)
  swToBYFactor: number = 1; // used to separate years: BBY (-1) from ABY (1)

  public onTouched: () => void = () => { };
  protected onDestroy = new Subject<void>();

  constructor(
    private store: Store<fromInitData.State>
  ) {
    this.yearFiltersForm = new FormGroup({
      bornFrom: new FormControl(''),
      bornTo: new FormControl(''),
      fromBY: new FormControl(''),
      toBY: new FormControl('')
    });
  }

  ngOnInit() {
    this.store.pipe(select(fromPeople.getBornFromFilter))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (state) => {
          this.yearFiltersForm.controls['bornFrom'].setValue(state ? Math.abs(state) : null);
        }
    );
    this.store.pipe(select(fromPeople.getBornToFilter))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (state) => {
          this.yearFiltersForm.controls['bornTo'].setValue(state ? Math.abs(state) : null);
        }
    );
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  onBornFromChange(value: string) {
    if (value === '')
      this.store.dispatch(new FilterActions.SetPeopleBornFromFilter({ filterValue: null }))
    else
      this.store.dispatch(new FilterActions.SetPeopleBornFromFilter({ filterValue: parseInt(value) * this.swFromBYFactor }))
  }

  onBornToChange(value: string) {
    if (value === '')
      this.store.dispatch(new FilterActions.SetPeopleBornToFilter({ filterValue: null }))
    else
      this.store.dispatch(new FilterActions.SetPeopleBornToFilter({ filterValue: parseInt(value) * this.swToBYFactor }))
  }

  onFromBYChange(value: number) {
    if (value) {
      this.yearFiltersForm.controls['toBY'].setValue(1);
      this.yearFiltersForm.controls['toBY'].disable();
      this.swFromBYFactor = 1;
    } else {
      this.yearFiltersForm.controls['toBY'].enable();
      this.swFromBYFactor = -1;
    };
    this.store.dispatch(new FilterActions.SetPeopleBornFromFilter({filterValue: this.yearFiltersForm.value.bornFrom * this.swFromBYFactor}))
  }

  onToBYChange(value: number) {
    if (value) {
      this.swToBYFactor = 1;
    } else {
      this.yearFiltersForm.controls['fromBY'].setValue(0);
      this.swToBYFactor = -1;
    };
    this.store.dispatch(new FilterActions.SetPeopleBornToFilter({filterValue: this.yearFiltersForm.value.bornTo * this.swToBYFactor}))
  }


  // Note all of the code below could be refactored into an abstract base class component
  // see https://medium.com/@ozak/stop-repeating-yourself-in-angular-how-to-create-abstract-components-9726d43c99ab
  writeValue(val: any): void {
    val && this.yearFiltersForm.setValue(val, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.yearFiltersForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.yearFiltersForm.disable() : this.yearFiltersForm.enable();
  }
}
