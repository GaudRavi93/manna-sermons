import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { INewUser, INewUserRegistration, IUserAuthResponse, IUserCreateResponse, IUserCreds } from '../models/register';
import { GlobalConstant } from '../../constants';
import { IUserLogin } from '../models/user';
import { tap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  public isUserPresent(): boolean {
    const creds: IUserCreds = this.getUserCreds();
    return !!creds.email && !!creds.password;
  }

  public register(data: INewUser): Observable<IUserCreateResponse> {
    const body: INewUserRegistration = {
      ... data,
      client_id: GlobalConstant.CLIENT_ID
    };
    return this.http.post<IUserCreateResponse>(environment.API + '/users', body);
  }

  public login(data: { email: string, password: string }): Observable<IUserAuthResponse> {
    const body: IUserLogin = {
      ...data,
      grant_type: 'password',
      client_id: GlobalConstant.CLIENT_ID,
      client_secret: GlobalConstant.CLIENT_SECRET
    };
    return this.http.post<IUserAuthResponse>(environment.AUTH + '/oauth/token', body).pipe(tap(res => {
      this.storageService.set(GlobalConstant.ACCESS_TOKEN, res.access_token);
      this.storageService.set(GlobalConstant.REFRESH_TOKEN, res.refresh_token);
      this.storageService.set(GlobalConstant.LOGIN, data.email);
      this.storageService.set(GlobalConstant.PASSWORD, data.password);
    }));
  }

  public socialLogin(token: string, provider: string, uid?: string, uname = 'User'): Observable<IUserAuthResponse> {
    const body: any = {
      provider,
      access_token: token,
      grant_type: 'assertion',
      client_id: GlobalConstant.CLIENT_ID,
      client_secret: GlobalConstant.CLIENT_SECRET
    };
    if (uid) {
      body.uid = uid;
      body.name = uname;
      body.jwt = token;
    }
    return this.http.post<IUserAuthResponse>(environment.AUTH + '/oauth/token', body).pipe(tap(res => {
      this.storageService.set(GlobalConstant.ACCESS_TOKEN, res.access_token);
      this.storageService.set(GlobalConstant.REFRESH_TOKEN, res.refresh_token);
    }));
  }

  public forgot(email: string): Observable<any> {
    const body = { email };
    return this.http.post(environment.API + '/passwords', body);
  }

  public refreshToken(): Observable<any> {
    const creds: IUserCreds = this.getUserCreds();

    if(!creds.email || !creds.password) {
      return of(false);
    }

    return this.login(creds);
  }

  public logout() {
    this.storageService.clearAll();
  }

  public getUserCreds(): IUserCreds {
    return {
      email: this.storageService.get(GlobalConstant.LOGIN) || '',
      password: this.storageService.get(GlobalConstant.PASSWORD) || ''
    }
  }
}
