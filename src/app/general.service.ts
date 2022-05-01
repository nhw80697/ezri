import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  thereIsUser = new Subject<boolean>()
  email: string | undefined | null = "אורח";
  error: any;

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.thereIsUser.next(true);
        this.email = user.email;
      } else {
        this.thereIsUser.next(false)
      }
    });
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
    this.afAuth.createUserWithEmailAndPassword(email, password)
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
        this.thereIsUser
      })
      .catch(function (error) { alert(error); });
  }
}
