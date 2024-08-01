import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    if (await this.authService.isLoggedIn()) {
      const currentUser: Usuario = await this.authService.getCurrentUser();
      const requiredRoles = route.data['roles'] as Array<string>;
      if (currentUser !== null) {
        if (requiredRoles && requiredRoles.includes(currentUser.rol)) {
          return true;
        } else {
          this.router.navigate(['/lista-cursos']);
          return false;
        }
      } else {
        return false;
      }
    } else {
      this.router.navigate(['/inicio']);
      return false;
    }
  }}
