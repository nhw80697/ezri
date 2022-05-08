import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { observable, Observable, BehaviorSubject } from 'rxjs';
import { GeneralService } from '../general.service';
import { User } from '../interfaces';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: any = {
    id: "",
    email: "",
    displayName: "",
    city: "",
    platoon: ""
  }


  constructor(public generalService: GeneralService, public afAuth: AngularFireAuth, public afs: AngularFirestore, public router: Router) {
    this.afAuth.authState.subscribe((user: any) => {
      this.user.email = user?.email
      this.user.id = user?.uid,
        this.user.displayName = user?.displayName
      this.afs.collection("users").doc<any>(user.uid).valueChanges().subscribe(res => {
        this.user.city = res.city,
          this.user.platoon = res.platoon
      })
    })
  }

  updateAccount() {
    this.afAuth.authState.subscribe((user: any) => {
      user?.updateProfile({
        displayName: this.user.displayName
      })
      this.afs.collection('users').doc(user.uid).set({
        'city': this.user.city,
        'platoon': this.user.platoon
      })
      this.router.navigate(['messages'])
    })
  }

  ngOnInit(): void {
  }

}
