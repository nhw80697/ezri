import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router, public generalService: GeneralService) { }
  canActivate(): any {
    if (this.generalService.isLoggedIn !== true) {
      this.router.navigate(['login'])
      return false
    }
    return true
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(public router: Router, public generalService: GeneralService) { }
  canActivate(): any {
    if (this.generalService.isLoggedIn == true) {
      this.router.navigate(['messages'])
      return false
    }
    return true
  }
}
