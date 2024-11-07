import {inject, Injectable} from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import {AuthService} from '../services/auth/auth.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private route = inject(Router);
  private authService = inject(AuthService)
    constructor() { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        return true;
    }
}
