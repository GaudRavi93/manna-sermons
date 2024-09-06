import { Component, NgZone, OnInit } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { IUserCreds } from '../shared/models/register';
import { AuthService } from '../shared/services/auth.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from '../shared/services/message.service';
import { GlobalConstant, popupText, Provider } from '../constants';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
// import { Facebook, FacebookLoginResponse } from '@awesome-cordova-plugins/facebook/ngx';
import { SignInWithApple, AppleSignInResponse, AppleSignInErrorResponse, ASAuthorizationAppleIDRequest } from '@awesome-cordova-plugins/sign-in-with-apple/ngx';
import { StorageService } from '../shared/services/storage.service';
// import { PushService } from '../shared/services/push.service';
import { PayService } from '../shared/services/pay.service';
import { UserService } from '../shared/services/user.service';
import { Platform } from '@ionic/angular';
import { IUser } from '../shared/models/user';
// import { ConfirmPopupComponent } from '../shared/components/confirm-popup/confirm-popup.component';
import { PurchasePopupComponent } from '../shared/components/purchase-popup/purchase-popup.component';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public userData: IUserCreds;
  public isVisiblePass = false;
  public isAppleSignVisible = true;
  
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private storage: StorageService,
    // private pushService: PushService,
    private pay: PayService,
    private googlePlus: GooglePlus,
    private popoverController: PopoverController,
    // private fb: Facebook,
    private userService: UserService,
    private signInWithApple: SignInWithApple,
    private router: Router,
    private pl: Platform,
    private deeplinks: Deeplinks,
    private zone: NgZone,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.tryToLogin();
    if (this.pl.is('android')) {
      this.isAppleSignVisible = false;
    }
  }

  public togglePassVisible() {
    this.isVisiblePass = !this.isVisiblePass;
  }

  public gotoSignUp() {
    this.router.navigate(['welcome']);
  }

  public gotoForgot() {
    this.router.navigate(['forgot']);
  }

  // public facebookLogin() {
  //   this.fb.login(['public_profile', 'user_friends', 'email'])
  //     .then((res: FacebookLoginResponse) => {
  //       this.doSocialLogin(res.authResponse.accessToken, Provider.FACEBOOK);
  //     })
  //     .catch(e => console.log('Error logging into Facebook', e));
  // }

  public appleLogin() {
    this.signInWithApple.signin({
      requestedScopes: [
        ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
        ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail
      ]
    })
      .then((res: AppleSignInResponse) => {
        localStorage.setItem('socialLoginResponse', JSON.stringify(res));
        localStorage.setItem('provider', Provider.APPLE);
        // https://developer.apple.com/documentation/signinwithapplerestapi/verifying_a_user
        // alert('Send token to apple for verification: ' + res.identityToken);
        const name = res.fullName.givenName + ' ' + res.fullName.familyName;
        this.doSocialLogin(res.identityToken, Provider.APPLE, res.user, name);
      })
      .catch((error: AppleSignInErrorResponse) => {
        // alert(error.code + ' ' + error.localizedDescription);
        console.error(error);
      });
  }

  public googleLogin() {
    this.googlePlus.login({
      webClientId: "841498643762-4rq292qodae9v1ndhf9gj3mi8r8kp22o.apps.googleusercontent.com",
      offline: true
      })
      .then(result => {
        localStorage.setItem('socialLoginResponse', JSON.stringify(result));
        localStorage.setItem('provider', Provider.GOOGLE);
        this.doSocialLogin(result.accessToken, Provider.GOOGLE);
      })
      .catch(err => {
        this.messageService.showAlert(`Error ${JSON.stringify(err)}`);
      });
  }

  private doSocialLogin(token: string, provider: string, uid?: string, uname?: string) {
    this.authService.socialLogin(token, provider, uid, uname).pipe(catchError(error => {
      return of({ error })
    })).subscribe(res => {
      if (!(res as any).error) {
        this.checkAndInitPush();
        this.userService.getUserData().subscribe(userRes => {
          const user: IUser = userRes;
          if (user.zip == null || user.city == null || user.state == null ||
            user.zip.trim() === '' || user.city.trim() === '' || user.state.trim() === ''){
              this.router.navigate(['registration']);
          }
          else {
            this.router.navigate(['home']);
            (window as any).cordova.plugins.firebase.analytics.logEvent('login', {
              userId: user.id,
              username: user.given_name,
              email: user.email
            });
            if (this.pay.isOk()){
              this.openConfirmation();
            }
          }          
          // else if (this.pay.isOk()){
          //   this.openConfirmation();
          // }
          // else{
          //   // this.openConfirmation();
          //   this.router.navigate(['home']);
          // }
        });
      } else {
        const msg = 'You have entered an invalid username or password'; // (res as any).error.error_description;
        this.messageService.showAlert(msg);
      }
    });
  }
  public async openConfirmation(){
    const popover = await this.popoverController.create({
      component: PurchasePopupComponent,
      cssClass: 'unsubscribe-welcome',
      translucent: false
    });
    popover.present();
    await popover.onDidDismiss().then((r) => {
      console.log(r);
    });
  }
  public login() {
    if (!this.isValid()) {
      return;
    }

    this.authService.login(this.userData).pipe(catchError(error => {
      return of({ error })
    })).subscribe(async res => {
      if (!(res as any).error) {
        localStorage.removeItem('socialLoginResponse');
        localStorage.removeItem('provider');
        await this.checkAndInitPush();
        this.userService.getUserData().subscribe(userRes => {
          const user: IUser = userRes;
          if (user.zip == null || user.city == null || user.state == null ||
            user.zip.trim() === '' || user.city.trim() === '' || user.state.trim() === ''){
              this.router.navigate(['registration']);
          } else {
            this.router.navigate(['home']);
            (window as any).cordova.plugins.firebase.analytics.logEvent('login', {
              userId: user.id,
              username: user.given_name,
              email: user.email
            });
            // deepLink for only native devices
            if (this.pl.is('cordova')) {
              this.deeplinks.routeWithNavController(this.navCtrl, {
                '/': 'SermonDetailPage'
              }).subscribe(match => {
                this.zone.run(() => {
                  const queryParams = this.getDepLinkQueryParams(match.$link.url);
                  const videoId = queryParams['videoId'];
                  this.router.navigate([`/sermon-detail/${videoId}`]);
                });
              }, nomatch => {
                // No deep link match found
                console.error('Got a deeplink that didn\'t match', nomatch);
              });
            }
            if (this.pay.isOk()){
              this.openConfirmation();
            }
          }          
          // else if (this.pay.isOk()){
          //   this.openConfirmation();
          // }
          // else{
          //   // this.openConfirmation();
          //   this.router.navigate(['home']);
          // }
        });        
        // await this.router.navigate(['home']);
      } else {
        const msg = 'You have entered an invalid username or password'; // (res as any).error.error_description;
        await this.messageService.showAlert(msg);
      }

      this.userData.email = '';
      this.userData.password = '';
    });
  }

  getDepLinkQueryParams(url: string) {
    const params = {};
    const parser = document.createElement('a');
    parser.href = url;
    const query = parser.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
  }

  private async checkAndInitPush() {
    const token = this.storage.get(GlobalConstant.PUSH_TOKEN);
    if (token) {
      // this.pushService.registerDevice(token);
      // await this.pushService.requestPushPermision();
    }
  }

  public isValid() {
    return this.userData.email && this.userData.password;
  }

  private tryToLogin() {
    this.userData = this.authService.getUserCreds();
    const res = JSON.parse(localStorage.getItem('socialLoginResponse'));
    const provide = localStorage.getItem('provider');
    if(res){
      if(provide === Provider.APPLE){
        const name = res.fullName.givenName + ' ' + res.fullName.familyName;
        this.doSocialLogin(res.identityToken, Provider.APPLE, res.user, name);
      }else{
        this.doSocialLogin(res.accessToken, Provider.GOOGLE);
      }
    }else{
      this.login();
    }
  }
}
