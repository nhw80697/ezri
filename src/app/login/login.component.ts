import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName = 'אורח';
  waring = '';
  loginOrLogout = "היכנס"

  constructor(public generalService: GeneralService, public router: Router) { }

  login(email: string, password: string) {
    this.generalService.loginUser(email, password).then(() => {
      this.router.navigate(['/messages']);
    });

  }

  ngOnInit(): void {
  }

}
