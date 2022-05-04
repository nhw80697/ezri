import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as firebase from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  userData: any;
  email: string | undefined | null = "אורח";
  error: any;

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.email = user.email;
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user != null ? true : false;
  }

  loginUser(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.email = res.user?.email;
      })
      .catch((error) => {
        console.log(error)
      });
  }


  createUser(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.loginUser(email, password);
      })
      .catch((error) => {
        alert(error);
      });
  }

  logoutUser() {
    this.afAuth.signOut()
      .then(() => {
        this.email = "אורח";
        window.location.reload();
      })
      .catch(function (error) { alert(error); });
  }
}
