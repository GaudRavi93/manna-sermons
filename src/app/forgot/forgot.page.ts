import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MessageService } from '../shared/services/message.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { URLS } from '../constants';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  public email: string;
  public isSuccessfulSent: boolean;
  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private iab: InAppBrowser,
  ) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.isSuccessfulSent = false;
    this.email = '';
  }
  public sendEmail() {
    this.authService.forgot(this.email).subscribe((result) => {
      this.isSuccessfulSent = true;
    }, (res) => {
      if ((res as any).error) {
        const obj = (res as any).error;
        // console.log('1', obj);
        // const msg = Object.keys(obj).map(key => `${key}: ${obj[key]}`).join(', ');
        this.messageService.showAlert(obj);
      }
    });
    // this.authService.forgot(this.email).pipe(catchError(error => of({ error }))
    // ).subscribe(res => {

    //   if ((res as any).error) {
    //     const obj = (res as any).error;
    //     console.log('2', obj);
    //     const msg = Object.keys(obj).map(key => `${key}: ${obj[key]}`).join(', ');
    //     this.messageService.showAlert(msg);
    //   }else{
    //     console.log('success');
    //     this.isSuccessfulSent = true;
    //   }

    // });;
  }

  public openURL(){
    const browser = this.iab.create(URLS.HELP_CENTER, '_system');
  }
  public gotoLogin() {
    this.router.navigate(['login']);
  }

  public gotoSignIn() {
    this.router.navigate(['welcome']);
  }

}
