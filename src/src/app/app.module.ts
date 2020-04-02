import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { FormsModule } from '@angular/forms';
import { AuthModule, OidcSecurityService } from 'angular-auth-oidc-client';
import { UserCardComponent } from './components/user-card/user-card.component';
import { HomeComponent } from './components/home/home.component';
import { RoleListComponent } from './components/role-list/role-list.component';
import { AlertListComponent } from './components/alert-list/alert-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoleCardComponent } from './components/role-card/role-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    UserListComponent,
    UserCardComponent,
    HomeComponent,
    RoleListComponent,
    AlertListComponent,
    RoleCardComponent
  ],
  imports: [
    HttpClientModule, 
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AuthModule.forRoot(), 
    NgbModule,
    RouterModule.forRoot([{path: "", component:HomeComponent, pathMatch: 'full' },
      { path: 'user-list', component: UserListComponent },
      { path: 'user-list/:id', component: UserCardComponent},
      { path: 'role-list', component: RoleListComponent },
      { path: 'role-list/:id', component: RoleCardComponent},
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [OidcSecurityService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
      private oidcSecurityService: OidcSecurityService
  ) {
  }

 }
