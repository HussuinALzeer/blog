import { Injectable } from '@angular/core';
import { Authdata } from './auth-data.model';
import { User } from './user.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer' 
import {GoogleAuthProvider} from 'firebase/auth'
import * as fromNav from '../store/action/nav.actions'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;

  private user: User;
  displayName: any;

  constructor(private router: Router, public Afauth: AngularFireAuth,
    public store: Store<fromRoot.State>) {
    
    this.Afauth.authState.subscribe(data => {
      this.authState = data
      })
     }
  s
  registerUser(authdata:Authdata) {
    this.Afauth.createUserWithEmailAndPassword(authdata.email, authdata.password)
      .then(result => {
        this.store.dispatch(new fromNav.AuthSuccessAction());
        this.router.navigate(['/']);
        localStorage.setItem('user', JSON.stringify(result.user));
      }).catch(error => {
      console.log(error)
    })
  }

  get authenticated():boolean {
    return this.authState !== null;
  }

  get CurrentUserId():string {
    return this.authenticated ? this.authState.uid : null;
  }

  
// this is a login with google and normal log in, i need to make new function for the normal log (email & password)
  
  login(authdata:Authdata) { 
    // this.store.dispatch(new fromNav.AuthAction());

    // this.Afauth.signInWithEmailAndPassword(authdata.email, authdata.password)
    //   .then(result => {
    //     this.store.dispatch(new fromNav.AuthSuccessAction());
    //     this.router.navigate(['/']);
    //   }).catch(error => {
    //     this.store.dispatch(new fromNav.AuthFailAction());
    //   });

    // google account login
    this.Afauth.signInWithPopup(new GoogleAuthProvider()).then((Result) => {
     

    }).catch(error => {
      console.log(error)
    })
    
  }
  loginUser(authdata) {

    this.Afauth.signInWithEmailAndPassword(authdata.email, authdata.password)
      .then(result => {
        this.store.dispatch(new fromNav.AuthSuccessAction());
        this.router.navigate(['/']);
        localStorage.setItem('user', JSON.stringify(result.user));
        this.store.dispatch(new fromNav.AuthAction());
      }).catch(error => {
        this.store.dispatch(new fromNav.AuthFailAction());
      });

   
  }
  logout() { 
    this.router.navigate(['/login']);
    this.Afauth.signOut();
    this.store.dispatch(new fromNav.AuthFailAction());
    localStorage.removeItem('user')
  }

  getUser() {
    return { ...this.user }
  }

  isAuth() {
    return this.user != null;
  }
}
