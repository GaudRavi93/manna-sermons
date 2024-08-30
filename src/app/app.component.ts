import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, UrlSerializer } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { TransitionService } from './shared/services/transition.service';
import { DarkService } from './shared/services/dark.service';
import { NavController, Platform } from '@ionic/angular';
import { PayService } from './shared/services/pay.service';
import { EventService } from './shared/services/event.service';
import { UserService } from './shared/services/user.service';
import { filter } from 'rxjs/operators';
import { IUser } from './shared/models/user';
import { Location } from '@angular/common';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';

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
    private location: Location,
    private userService: UserService,
    private deeplinks: Deeplinks,
    private zone: NgZone,
    private navCtrl: NavController
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
      // Added hardware back button functionality
      this.pl.backButton.subscribeWithPriority(0, () => {
        if (!this.location.isCurrentPathEqualTo('/home')) {
          this.location.back();
        }
      });

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

      // deepLink for only native devices
      if(this.pl.is('cordova')){
        setTimeout(() => {
          this.deeplinks.routeWithNavController(this.navCtrl, {
            '/': 'SermonDetailPage'
          }).subscribe(match => {
            this.zone.run(() => {
              const queryParams = this.getDepLinkQueryParams(match.$link.url);
              const videoId = queryParams['videoId'];
              this.router.navigate([`/sermon-detail/${videoId}`]);
            });
          }, nomatch => {
            console.error('Got a deeplink that didn\'t match', nomatch);
          });
        }, 5000);
      }
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
}
