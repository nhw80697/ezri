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

  menu: any = { messages: true, delivery: false }
  email: string | undefined | null = this.generalService.email;
  constructor(public router: Router, public generalService: GeneralService) { }

  selectMenu(e: any) {
    for (const option in this.menu) {
      this.menu[option] = false
    }
    this.menu[e.target.name] = true
  }

  logout() {
    this.generalService.logoutUser();
    this.router.navigate(['login'])
  }

  ngOnInit(): void {
  }

}
