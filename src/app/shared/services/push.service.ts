import { Injectable } from '@angular/core';
// import { FCM } from '@ionic-native/fcm/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { Router } from '@angular/router';
import { GlobalConstant } from '../../constants';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Platform } from '@ionic/angular';
import { IPayload } from '../models/push';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(
    private fcm: FCM,
    private http: HttpClient,
    private router: Router,
    private pl: Platform
  ) {}

  public async init() {
    // console.log('FCM init');
    // if (this.pl.is('desktop')) {
    //   console.log('is desktop');
    //   return;
    // }

    // console.log(this.fcm);
    // this.fcm.hasPermission().then(doesIt => {
    //   console.log('haspermission ', doesIt);
    // });
    // const fcmToken: string = await this.fcm.getToken();
    // console.log('FcmToken', fcmToken);
    this.fcm.getToken().then(token => {
      // console.log('getToken');
      // console.log(token);
      localStorage.setItem(GlobalConstant.PUSH_TOKEN, token);
      this.registerDevice(token);
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      // console.log('refresh', token);
    });

    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        if (!data || !data.data) {
          // console.log('Empty data!!!');
          return;
        }

        const payload: IPayload = JSON.parse(data.data);
        // console.log('payload>> ', payload);
        if (!payload.pastor_id) {
          return;
        }

        const route = `pastor-detail/${payload.pastor_id}`;
        this.router.navigate([route]);
      } else {
        console.log('Push received in foreground, do nothing');
      }

      const urls = [''];
      if (!data.wasTapped && !urls.includes(this.router.url)) {
        // console.log('New message !');
        return;
      }

    });
  }

  public async requestPushPermision() {
    const res = await this.fcm.hasPermission();

    return await this.fcm.requestPushPermission({
      ios9Support: {
        timeout: 10,
        interval: 0.3
      }
    });
  }

  public registerDevice(token: string) {
    /*
      * Required parameters are:
      * `token` - the device token for receiving push notifications.
      * `platform` - either `ios` or `android`
      * `model` - a description of the device model
      * */

    const data = {
      token,
      platform: this.pl.is('ios') ? 'ios' : 'android',
      model: this.pl.is('ios') ? 'iPhone' : 'Android',
    };

    this.http.post(environment.API + '/devices', data).subscribe(res => {

      this.requestPushPermision();
    }, err => {
      console.log('push subscribe err: ', err);
    });
  }

  public unsubscribe(): void {
    const registrationId = localStorage.getItem(
      GlobalConstant.PUSH_TOKEN
    );
    if (!registrationId) {
      return;
    }

    const data = JSON.stringify({ registrationId });
    this.http.post(environment.PUSH_API + '/unsubscribe', data).subscribe();
  }
}
