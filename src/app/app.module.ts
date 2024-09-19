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
// import { Facebook } from '@awesome-cordova-plugins/facebook/ngx';
import { SignInWithApple } from '@awesome-cordova-plugins/sign-in-with-apple/ngx';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';

// import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AppLauncher } from '@ionic-native/app-launcher/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { AngularFireModule } from '@angular/fire';
import { Push } from '@ionic-native/push/ngx';


const firebaseConfig = {
  projectId: "manna-328020",
  messagingSenderId: "841498643762",
  storageBucket: "manna-328020.appspot.com",
  authDomain: "manna-328020.firebaseapp.com",
  apiKey: "AIzaSyAQmxZqmayWACkOgKrDGwyUcZvCLRC4JjY",
  appId: "1:841498643762:web:a614101d68db3b511d1b2b"
};

// import { InAppPurchase2 } from '@awesome-cordova-plugins/in-app-purchase-2/ngx';

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
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [
    // InAppPurchase2,
    SocialSharing,
    NativePageTransitions,
    // FCM,
    InAppBrowser,
    AppLauncher,
    GooglePlus,
    // Facebook,
    Deeplinks,
    SignInWithApple,
    Push,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
