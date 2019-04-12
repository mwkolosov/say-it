import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isTokenExists = !!localStorage.getItem('token');

    // @ts-ignore
    if (next.component.name !== 'MainComponent' && !isTokenExists) {
      location.href = '/sign';
      return false;
    }

    // @ts-ignore
    return next.component.name === 'SignComponent' ? !isTokenExists : isTokenExists;
  }
}
