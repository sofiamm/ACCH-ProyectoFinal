import { Injectable } from '@angular/core';
import { Auth, signOut, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: Auth) { }

  async loginGoogle() {
    return await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  async logout() {
    return await signOut(this.auth);
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

}
