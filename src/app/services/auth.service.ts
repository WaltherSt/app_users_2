import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../config/config';
import { logout } from '../store/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = `${BACKEND_URL}/login`;

  private _user: any;

  constructor(private http: HttpClient, private store: Store<{ auth: any }>) {
    this.store.select('auth').subscribe((state) => {
      this._user = state;
    });
  }

  loginUser({ username, password }: any): Observable<any> {
    return this.http.post<any>(this.url, { username, password });
  }

  set user(user: any) {
    sessionStorage.setItem('login', JSON.stringify(user));
  }
  get user() {
    return this._user;
  }

  set token(token: string) {
    sessionStorage.setItem('token', token);
  }

  get token() {
    return sessionStorage.getItem('token')!;
  }

  getPayLoad(token: string) {
    if (token != null) {
      return JSON.parse(atob(token.split('.')[1]));
    } else return null;
  }

  isAdmin(): boolean {
    return this.user.isAdmin;
  }

  isAuth() {
    return this.user.isAuth;
  }

  logout() {
    this.store.dispatch(logout());
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('token');
  }
}
