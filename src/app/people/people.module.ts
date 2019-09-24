import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleRoutingModule } from './people-routing.module';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { PeopleTableComponent } from './people-table/people-table.component';
import { PeopleComponent } from './people/people.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonComponent } from './person/person.component';
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
    ReactiveFormsModule
  ]
})
export class PeopleModule { }
