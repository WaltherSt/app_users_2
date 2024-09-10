import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { User } from '../../models/user';
import { login } from '../../store/auth/auth.actions';

@Component({
  selector: 'login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: User = new User();

  constructor(private store: Store<{ auth: any }>) {}

  onSubmit() {
    if (!this.user.username || !this.user.password) {
      Swal.fire(
        'Error de validación',
        'Username y password requerido',
        'error'
      );
    } else {
      this.store.dispatch(
        login({ username: this.user.username, password: this.user.password })
      );
    }
  }
}
