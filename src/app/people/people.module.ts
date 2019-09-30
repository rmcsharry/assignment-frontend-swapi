import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { PeopleRoutingModule } from './people-routing.module';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { PeopleTableComponent } from './components/people-table/people-table.component';
import { PeopleComponent } from './components/people/people.component';
import { PersonComponent } from './components/person/person.component';

import { peopleReducer } from './store/reducers/people.reducer';
import { PeopleEffects } from './store/effects/people.effects';
import { LoaderComponent } from '../loader/loader.component';


@NgModule({
  declarations: [
    PeopleListComponent,
    PeopleTableComponent,
    PeopleComponent,
    PersonComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    PeopleRoutingModule,
    CustomMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    StoreModule.forFeature('people', peopleReducer),
    EffectsModule.forFeature([PeopleEffects]),
    NgxTypedJsModule
  ]
})
export class PeopleModule { }
