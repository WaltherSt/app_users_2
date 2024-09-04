import { Routes } from '@angular/router';
import { Forbidden403Component } from './components/forbidden403/forbidden403.component';
import { LoginComponent } from './components/login/login.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserComponent } from './components/user/user.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/users/page/0',
  },
  {
    path: 'users',
    component: UserComponent,
  },
  {
    path: 'users/page/:page',
    component: UserComponent,
  },
  {
    path: 'users/create',
    component: UserFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'users/edit/:id',
    component: UserFormComponent,
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: Forbidden403Component },
];
