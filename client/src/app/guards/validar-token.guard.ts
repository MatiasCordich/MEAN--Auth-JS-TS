import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import {tap} from 'rxjs/operators'
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean  {

    const res = this.authService.validateToken()
    
    return res.pipe(
      tap( valid => {
        if(!valid) {this.router.navigateByUrl('/auth')}
      })
    );
  }
  canLoad(): Observable<boolean> | boolean {

    const res = this.authService.validateToken()

    return res.pipe(
      tap( valid => {
        if(!valid) {this.router.navigateByUrl('/auth')}
      })
    );

  }
}
