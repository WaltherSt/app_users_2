import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { tokenInterceptor } from './interceptors/token.interceptor';

import { AuthEffect } from './store/auth/auth.effects';
import { authReducer } from './store/auth/auth.reducer';
import { UsersEffects } from './store/users/users.effects';
import { usersReducer } from './store/users/users.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideStore({ users: usersReducer, auth: authReducer }),
    provideEffects(UsersEffects, AuthEffect),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
