import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { PeopleRoutingModule } from './people-routing.module';

import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleTableComponent } from './people-table/people-table.component';
import { PeopleComponent } from './people/people.component';
import { PersonComponent } from './person/person.component';

import { peopleReducer } from './reducers/people.reducer';
import { PeopleEffects } from './effects/people.effects';


@NgModule({
  declarations: [
    PeopleListComponent,
    PeopleTableComponent,
    PeopleComponent,
    PersonComponent
  ],
  imports: [
    CommonModule,
    PeopleRoutingModule,
    CustomMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    StoreModule.forFeature('people', peopleReducer),
    EffectsModule.forFeature([PeopleEffects])
  ]
})
export class PeopleModule { }
