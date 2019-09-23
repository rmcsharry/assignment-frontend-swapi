import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleRoutingModule } from './people-routing.module';
import { CustomMaterialModule } from '../custom-material/custom-material.module';

@NgModule({
  declarations: [
    PeopleListComponent
  ],
  imports: [
    CommonModule,
    PeopleRoutingModule,
    CustomMaterialModule
  ]
})
export class PeopleModule { }
