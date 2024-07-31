import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      const currentUser: Usuario = this.authService.getCurrentUser();
      const requiredRoles = route.data['roles'] as Array<string>;

      if (requiredRoles && requiredRoles.includes(currentUser.rol)) {
        return true;
      } else {
        this.router.navigate(['/inicio']);
        return false;
      }
    } else {
      this.router.navigate(['/inicio']);
      return false;
    }
  }
}
