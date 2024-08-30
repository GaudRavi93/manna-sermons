import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INewUser, IUserCreateResponse } from '../shared/models/register';
import { AuthService } from '../shared/services/auth.service';
import { StorageService } from '../shared/services/storage.service';
import { GlobalConstant, Provider } from '../constants';
import { MessageService } from '../shared/services/message.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@awesome-cordova-plugins/facebook/ngx';
import { SignInWithApple, AppleSignInResponse, AppleSignInErrorResponse, ASAuthorizationAppleIDRequest } from '@awesome-cordova-plugins/sign-in-with-apple/ngx';
import { Platform, PopoverController } from '@ionic/angular';
import { UserService } from '../shared/services/user.service';
import { PayService } from '../shared/services/pay.service';
import { IUser } from '../shared/models/user';
import { PurchasePopupComponent } from '../shared/components/purchase-popup/purchase-popup.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  public isVisibleEmailSign = false;
  public userData: INewUser;
  public isVisiblePass = false;
  public isAppleSignVisible = true;

  constructor(
    private router: Router,
    private storage: StorageService,
    private authService: AuthService,
    private userService: UserService,
    private messageService: MessageService,
    private googlePlus: GooglePlus,
    private fb: Facebook,
    private pay: PayService,
    private popoverController: PopoverController,
    private signInWithApple: SignInWithApple,
    private pl: Platform,
  ) { }

  ngOnInit() {
    this.init();
    if (this.pl.is('android')) {
      this.isAppleSignVisible = false;
    }
  }

  ionViewDidEnter() {
    this.init();
  }

  public showSHA() {
    // for debug
    /*this.googlePlus.getSigningCertificateFingerprint().then(res => {
      this.messageService.showAlert(`SHA ${JSON.stringify(res)}`);
    }).catch(err => {
      this.messageService.showAlert(`SHA Error ${JSON.stringify(err)}`);
    });*/
  }

  public testAlert() {
    // for debug
    // this.messageService.showAlert('Test');
  }

  public signInWithGoogle(): void {
    this.googlePlus.login({})
      .then(result => {
        // this.doSign(result.email, result.userId);
        this.doSocialLogin(result.accessToken, Provider.GOOGLE);
      })
      .catch(err => {
        this.messageService.showAlert(`Error ${JSON.stringify(err)}`);
      });
  }

  public signInWithFB(): void {
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        const email = `${res.authResponse.userID}fb@fb.com`;
        const pass = res.authResponse.userID;
        // this.doSign(email, pass);
        this.doSocialLogin(res.authResponse.accessToken, Provider.FACEBOOK);
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  public signApple(): void {
    this.signInWithApple.signin({
      requestedScopes: [
        ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
        ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail
      ]
    })
      .then((res: AppleSignInResponse) => {
        // https://developer.apple.com/documentation/signinwithapplerestapi/verifying_a_user
        // alert('Send token to apple for verification: ' + res.identityToken);
        this.doSocialLogin(res.identityToken, Provider.APPLE, res.user, '');
        /*const pass = Date.now().toString();
        const email = res.email === '' ? `apple-${res.user}@x.com` : res.email;
        if (!res.email) {
          console.log('No email given, please change settings and try again');
        }
        this.doSign(email, pass);*/
      })
      .catch((error: AppleSignInErrorResponse) => {
        // alert(error.code + ' ' + error.localizedDescription);
        console.error(error);
      });
  }

  private doSocialLogin(token: string, provider: string, uid?: string, uname?: string) {
    this.authService.socialLogin(token, provider, uid, uname).pipe(catchError(error => {
      return of({ error })
    })).subscribe(res => {
      if (!(res as any).error) {
        this.userService.getUserData().subscribe(userRes => {
          const user: IUser = userRes;
          if (user.zip == null || user.city == null || user.state == null ||
            user.zip.trim() === '' || user.city.trim() === '' || user.state.trim() === ''){
              this.router.navigate(['registration']);
          } else {
            this.router.navigate(['home']);
            if (this.pay.isOk()){
              this.openConfirmation();
            }
          }
          // else if (this.pay.isOk()){
          //   this.router.navigate(['home']);
          //   this.openConfirmation();
          // }
          // else{
          //   this.router.navigate(['home']);
          // }
        }); 
        // this.router.navigate(['registration']);
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

  private doSign(email: string, password: string) {
    this.userData = {
      email,
      password,
      password_confirmation: password
    };
    this.register();
  }

  public toggleSign() {
    this.init();
    this.isVisibleEmailSign = !this.isVisibleEmailSign;
  }

  public togglePassVisible() {
    this.isVisiblePass = !this.isVisiblePass;
  }

  public gotoLogin() {
    this.init();
    this.router.navigate(['login']);
  }

  public isValid() {
    // email regExp
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return this.userData.email &&
      reg.test(this.userData.email) &&
      this.userData.password &&
      this.userData.password.length > 5 &&
      this.userData.password_confirmation &&
      this.userData.password === this.userData.password_confirmation
  }

  public register() {
    this.authService.register(this.userData).pipe(catchError(error => {
      return of({ error })
    })).subscribe(res => {
      if (!(res as any).error) {
        this.storage.set(GlobalConstant.ACCESS_TOKEN, (res as IUserCreateResponse).user.access_token);
        this.storage.set(GlobalConstant.REFRESH_TOKEN, (res as IUserCreateResponse).user.refresh_token);
        this.storage.set(GlobalConstant.LOGIN, this.userData.email);
        this.storage.set(GlobalConstant.PASSWORD, this.userData.password);

        this.isVisibleEmailSign = false;
        this.router.navigate(['registration']);
      } else {
        const msg = ((res as any).error.error as string[]).join(', ');
        this.messageService.showAlert(msg);
      }

    });
  }

  private init() {
    this.userData = {
      email: '',
      password: '',
      password_confirmation: ''
    };
  }

}
