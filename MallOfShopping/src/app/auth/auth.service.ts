import { Injectable } from '@angular/core';

import { Router } from  "@angular/router";
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(public  afAuth:  AngularFireAuth, public  router:  Router) {
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  async login(email: string, password: string) {
    const result = await this.afAuth.signInWithEmailAndPassword(email, password);
    await this.router.navigate(['grocery-list']);
  }

  async register(email: string, password: string) {
    await this.afAuth.createUserWithEmailAndPassword(email, password)
  }

  // https://www.techiediaries.com/angular-firebase/angular-9-firebase-authentication-email-google-and-password/
  async sendEmailVerification() {
    //await this.afAuth.auth.currentUser.sendEmailVerification()
    await this.router.navigate(['admin/verify-email']);
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout(){
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    await this.router.navigate(['grocery-list']);
  }

  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }

  getUser() : User {
    return  JSON.parse(localStorage.getItem('user'));
  }
}
