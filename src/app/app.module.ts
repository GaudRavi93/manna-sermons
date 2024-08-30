import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptors';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { TabsPageModule } from './shared/components/tabs/tabs.module';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@awesome-cordova-plugins/facebook/ngx';
import { SignInWithApple } from '@awesome-cordova-plugins/sign-in-with-apple/ngx';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';

import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AppLauncher } from '@ionic-native/app-launcher/ngx';
import { InAppPurchase2 } from '@awesome-cordova-plugins/in-app-purchase-2/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    SharedModule,
    TabsPageModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule.forRoot({ animated: true }),
    AppRoutingModule,
  ],
  providers: [
    InAppPurchase2,
    SocialSharing,
    NativePageTransitions,
    FCM,
    InAppBrowser,
    AppLauncher,
    GooglePlus,
    Facebook,
    SignInWithApple,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
