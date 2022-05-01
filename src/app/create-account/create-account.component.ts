import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(public generalService: GeneralService) { }
  waring: string = "";
  createAccount(email: string, password: string, password2: string) {
    if (password != password2) {
      this.waring = "הסיסמאות אינן תואמות";
      return
    }
    this.generalService.createUser(email, password)
  }
  ngOnInit(): void {
  }

}
