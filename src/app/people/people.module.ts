import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { PeopleRoutingModule } from './people-routing.module';

import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleTableComponent } from './people-table/people-table.component';
import { PeopleComponent } from './people/people.component';
import { PersonComponent } from './person/person.component';

import { peopleReducer } from './reducers/people.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PeopleEffects } from './effects/people.effects';
import {FlexLayoutModule} from '@angular/flex-layout';

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
