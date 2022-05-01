import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isUser: boolean | undefined
  email: string | undefined | null = this.generalService.email;
  constructor(public router: Router, public generalService: GeneralService) {
    this.generalService.thereIsUser.subscribe({
      next: (user) => { this.isUser = user }
    })
  }

  logout() {
    this.generalService.logoutUser();
    this.router.navigate(['login'])
  }

  ngOnInit(): void {
  }

}
