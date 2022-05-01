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
    return this.generalService.thereIsUser.pipe(
      tap((user: any) => {
        if (!user) {
          this.router.navigate(['/login'])
        }
      }))
  }
}
