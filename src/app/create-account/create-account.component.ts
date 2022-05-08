import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(public generalService: GeneralService, public router: Router, public afs: AngularFirestore) { }
  waring: string = "";
  createAccount(email: string, password: string, password2: string, platoon: string, displayName: string, city: string) {
    if (password != password2) {
      this.waring = "הסיסמאות אינן תואמות";
      return
    }
    this.generalService.createUser(email, password, platoon, city, displayName).then((user: any) => {
      console.log(user)
      // this.afs.collection("users").doc(user.uid).set({
      //   "platoon": platoon,
      //   "city": city,
      //   "displayName": displayName
      // })
      this.router.navigate(['/messages'])
    })
  }
  ngOnInit(): void {
  }

}
