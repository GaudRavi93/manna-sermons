import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstant } from '../../constants';
import { StorageService } from '../services/storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private storage: StorageService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.storage.get(GlobalConstant.ACCESS_TOKEN);
        if (token && !request.url.includes('oauth/token')) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }
}
