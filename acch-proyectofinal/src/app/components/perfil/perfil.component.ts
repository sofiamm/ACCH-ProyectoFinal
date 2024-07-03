import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatIcon } from '@angular/material/icon';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    HeaderComponent,
    MatIcon
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  name = this.getUserName();
  email = this.getUserEmail();
  phone = this.getUserPhone();
  photo = this.getUserPhoto();

  constructor(private authService: AuthService) { }

  getUserName() {
    var name = this.authService.getCurrentUser()?.displayName;

    if (name == null || undefined) {
      name = this.authService.getCurrentUser()?.email;
    } else {
      name = this.authService.getCurrentUser()?.displayName;
    }
    return name;
  }

  getUserEmail() {
    var email = this.authService.getCurrentUser()?.email;
    return email;
  }

  getUserPhone() {
    var phone = this.authService.getCurrentUser()?.phoneNumber;

    if (phone == null || undefined) {
      phone = "-";
    } else {
      phone = this.authService.getCurrentUser()?.phoneNumber;
    }
    return phone;
  }

  getUserPhoto() {
    var photo = this.authService.getCurrentUser()?.photoURL;

    if (photo == null || undefined) {
      photo = "https://i.pinimg.com/474x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg";
    } else {
      photo = this.authService.getCurrentUser()?.photoURL;
    }
    return photo;
  }
}
