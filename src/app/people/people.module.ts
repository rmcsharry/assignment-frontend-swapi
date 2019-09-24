import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleRoutingModule } from './people-routing.module';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { NgxTypedJsModule } from 'ngx-typed-js';
@NgModule({
  declarations: [
    PeopleListComponent
  ],
  imports: [
    CommonModule,
    PeopleRoutingModule,
    CustomMaterialModule,
    NgxTypedJsModule
  ]
})
export class PeopleModule { }
