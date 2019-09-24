import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleComponent } from './people/people.component';
import { PeopleTableComponent } from './people-table/people-table.component';

const routes: Routes = [
  { path: '', component: PeopleTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
