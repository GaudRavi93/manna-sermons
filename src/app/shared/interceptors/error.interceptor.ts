import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {

          if (err.status !== 401) {
            return throwError(err.error);
          } else {
            return this.handle401Error(request, next, err);
          }

        }));
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler, err) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((res: any) => {
                  if (!res) {
                    this.router.navigate(['welcome']);
                  }
                  this.isRefreshing = false;
                  this.refreshTokenSubject.next(res.token);
                  return next.handle(this.addToken(request, res.access_token));
                }));

        } else {
            return throwError(err);
            /*return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(jwt => {
                    return next.handle(this.addToken(request, jwt));
                }));*/
        }
    }
}
