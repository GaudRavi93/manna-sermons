import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUser } from '../models/user';
import { AuthService } from './auth.service';
import { IUserCreds } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  public getUserData(): Observable<IUser> {
    return this.http.get<IUser>(environment.API + '/user');
  }

  public updateUserData(data: IUser): Observable<IUser> {
    const creds: IUserCreds = this.auth.getUserCreds();
    const payload = {
      ...data,
      password: creds.password,
      password_confirmation: creds.password
    };
    return this.http.put<IUser>(environment.API + '/user', payload);
  }
}
