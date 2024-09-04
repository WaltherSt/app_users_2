import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: User;

  constructor(private sharingData: SharingDataService) {
    this.user = new User();
  }

  onSubmit() {
    if (!this.user.username || !this.user.password) {
      Swal.fire(
        'Error de validación',
        'Username y password requerido',
        'error'
      );
    } else {
      this.sharingData.handlerLoginEventEmitter.emit({
        username: this.user.username,
        password: this.user.password,
      });
    }
  }
}
