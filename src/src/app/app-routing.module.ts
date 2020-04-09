import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCardComponent } from './components/user-card/user-card.component';
import { AdministrationGuard } from './guards/administration.guard';
import { UserListComponent } from './components/user-list/user-list.component';
import { HomeComponent } from './components/home/home.component';
import { RoleListComponent } from './components/role-list/role-list.component';
import { RoleCardComponent } from './components/role-card/role-card.component';


const routes: Routes = [{path: "", component:HomeComponent, pathMatch: 'full' },
{ path: 'user-list', canActivate:[AdministrationGuard],  component: UserListComponent },
{ path: 'user-list/:id', canActivate:[AdministrationGuard], component: UserCardComponent},
{ path: 'role-list', canActivate:[AdministrationGuard], component: RoleListComponent },
{ path: 'role-list/:id', canActivate:[AdministrationGuard], component: RoleCardComponent},
{ path: 'user-profile/:id', component: UserCardComponent},
{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
