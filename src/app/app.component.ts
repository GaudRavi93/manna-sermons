import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, UrlSerializer } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { TransitionService } from './shared/services/transition.service';
import { DarkService } from './shared/services/dark.service';
import { Platform } from '@ionic/angular';
import { PayService } from './shared/services/pay.service';
import { EventService } from './shared/services/event.service';
import { UserService } from './shared/services/user.service';
import { filter } from 'rxjs/operators';
import { IUser } from './shared/models/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public showTabs = false;



  constructor(
    private activatedRoute: ActivatedRoute,
    private transitionService: TransitionService,
    private authService: AuthService,
    private darkService: DarkService,
    private eventService: EventService,
    private pay: PayService,
    private pl: Platform,
    private router: Router,
    private userService: UserService
  ) {
    // this.pay.init();
    
    router.events.subscribe(val => {
      if (val instanceof NavigationStart) {
        this.transitionService.animate(val.url);
      }
      // this.router.navigate('account-info');
      // return;
      if (val instanceof NavigationEnd) {
        // this.showTabs = true;
        const allowUrl = ['/login', '/welcome', '/forgot', '/churches', '/registration'];

        // if (allowUrl.includes(val.urlAfterRedirects)){
        //   this.showTabs = false;
        // }else{
        //   this.showTabs = true;
        // }
        // setTimeout(() => {
          this.showTabs = !this.activatedRoute.root.firstChild.snapshot.data.hideTabs;

        // }, 300);
        // if (!this.pay.isOk() && !allowUrl.includes(val.urlAfterRedirects)) {
        //   // const path = 'subscribe';
        //   // this.showTabs = true;

        //   this.userService.getUserData().subscribe(res => {
        //     const user: IUser = res;
        //     console.log('abababab');
        //     if (user.zip == null || user.city == null || user.state == null ||
        //       user.zip.trim() === '' || user.city.trim() === '' || user.state.trim() === ''){
        //       console.log('abababab');
        //       console.log('registration');
        //       this.router.navigate(['registration']);
        //     }else{
        //       console.log('subscribe');
        //       this.router.navigate(['subscribe']);
        //     }
        //   });
        //   // return;
        // }

        if (val.urlAfterRedirects === '/') {
          const path = this.authService.isUserPresent() ? 'login' : 'welcome';
          // this.showTabs = false;
          this.router.navigate([path]);
          return;
        }
        // if (['/login', '/welcome', '/forgot'].includes(val.url)){
        //   this.showTabs = false;
        //   this.hide_Tabs();
        // }else{
        //   console.log('aaaaaaaaa', val.url);
        //   this.showTabs = true;
        //   this.show_Tabs();
        // }

      }
    });

    this.initializeApp();
  }


  private initializeApp() {
    this.pl.ready().then(() => {
      // this.darkService.init();

      this.pay.init();
      const url = decodeURI(window.location.href);
      localStorage.setItem('v-counter', JSON.stringify(1));
      localStorage.setItem('m-counter', JSON.stringify(1));

      // android height fix
      if (this.pl.is('android')) {
        let height = localStorage.getItem('device-height');
        const currentHeight = window.innerHeight + '';
        if (!height) {
          localStorage.setItem('device-height', currentHeight);
          height = currentHeight;
        }
        setTimeout(() => {
          this.eventService.heightChanged(height !== window.innerHeight + '');
        }, 1000);
      }
      // this.navEvents();
    });
  }


}
