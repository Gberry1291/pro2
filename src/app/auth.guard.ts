import {inject, Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Auth, user} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    private auth: Auth = inject(Auth);
    private router: Router = inject(Router);
    private user$ = user(this.auth);

    private authService: AuthService = inject(AuthService);

    canActivate(): Observable<boolean> {
        const currentRoute = this.router.routerState.snapshot.url;
        const currentRouteIsLogin = currentRoute === '/login';

        return this.user$.pipe(
            map((user) => {
                if (user) {
                    return true;
                } else if (user && currentRouteIsLogin) {
                    this.router.navigate(['/']);
                    return false
                } else {
                    this.router.navigate(['/login']);
                    return false;
                }
            })
        );

        // return this.user$.pipe(
        //     map(() => {
        //         if (this.authService.testuser().email) {
        //             return true;
        //         } else if (this.authService.testuser().email && currentRouteIsLogin) {
        //             this.router.navigate(['/']);
        //             return false
        //         } else {
        //             this.router.navigate(['/login']);
        //             return false;
        //         }
        //     })
        // );

        
    }
}