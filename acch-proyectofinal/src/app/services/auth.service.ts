import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, User, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from './usuario.service';
import { Notificaciones } from '../util/notificaciones.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  notificaciones = new Notificaciones();

  constructor(
    public auth: Auth,
    private userService: UsuarioService
  ) { }

  private storeUserInfoLocally(user: Usuario) {
    localStorage.setItem('usuario', JSON.stringify(user));
  }


  async login(email: string, password: string) {
    if (email || password) {
      try {
        const result = await signInWithEmailAndPassword(this.auth, email, password);
        if (result.user) {
          const existingUser = await this.userService.getUserByEmail(email);
          if (existingUser) {
            this.storeUserInfoLocally(existingUser);
          } else {
            this.notificaciones.showErrorNotificacion('Usuario no registrado.');
          }
        }
        return result;
      } catch (error: any) {
        this.notificaciones.showErrorNotificacion('Error al iniciar sesión.');
        throw error;
      }
    }
    return null;
  }


  async register(usuario: Usuario) {
    await this.userService.createUser(usuario);
    return await createUserWithEmailAndPassword(this.auth, usuario.correoElectronico, usuario.contrasena);
  }

  async loginGoogle() {
    try {
      const result = await signInWithPopup(this.auth, new GoogleAuthProvider());
      if (result.user) {
        const existingUser = await this.userService.getUserId(result.user.uid);
        if (existingUser) {
          this.storeUserInfoLocally(existingUser);
        } else {
          this.notificaciones.showErrorNotificacion('Usuario no registrado.');
        }
      }
      return result;
    } catch (error: any) {
      return "";
    }
  }

  async signupGoogle() {
    try {
      const result = await signInWithPopup(this.auth, new GoogleAuthProvider());
      if (result.user) {
        const existingUser = await this.userService.getUserId(result.user.uid);
        if (!existingUser) {
          const newUser: Usuario = this.tmpToUser(result.user);
          await this.userService.createUserGoogle(newUser);
          this.storeUserInfoLocally(newUser);
          return newUser;
        } else {
          this.notificaciones.showInfoNotificacion('Usuario registrado anteriormente. Iniciando sesión...');
          this.storeUserInfoLocally(existingUser);
          return existingUser;
        }
      }
      return null;
    } catch (error: any) {
      return null;
    }
  }

  async logout() {
    localStorage.removeItem('usuario');
    this.auth.signOut();
  }


  async getCurrentUser() {
    if (typeof localStorage !== 'undefined') {
      return JSON.parse(localStorage.getItem('usuario') || '');
    } else {
      return null;
    }
  }

  isLoggedIn(): boolean {
    try {
      if (localStorage.length > 0) {
        return !!localStorage.getItem('usuario');
      } else {
        return false;
      }
    } catch (e) {
      console.log('localStorage no disponible');
      return true;
    }
  }


  tmpToUser(userTmp: User): Usuario {
    return {
      id: userTmp.uid,
      correoElectronico: userTmp.email ? userTmp.email : "",
      nombre: userTmp.displayName?.split(' ')[0] || '',
      imagen: userTmp.photoURL ? userTmp.photoURL : "",
      apellido: userTmp.displayName?.split(' ')[1] || '',
      telefono: userTmp.phoneNumber ? userTmp.phoneNumber : "-",
      contrasena: "-",
      rol: 'alumno',
      cursos_inscritos: []
    };
  }
}
