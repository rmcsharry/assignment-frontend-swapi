import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleComponent } from './people/people.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleTableComponent } from './people-table/people-table.component';
import { PersonComponent } from './person/person.component';
import { PersonGuard } from './guards/person-guard';

const routes: Routes = [
  { path: ':id', component: PersonComponent, },
  { path: '', component: PeopleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
