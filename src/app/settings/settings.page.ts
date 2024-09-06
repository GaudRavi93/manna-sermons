import { Component, OnInit } from '@angular/core';
import { ISettingItem, IUser } from '../shared/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ConfirmPopupComponent } from '../shared/components/confirm-popup/confirm-popup.component';
import { popupText, URLS } from '../constants';
import { AuthService } from '../shared/services/auth.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public list: ISettingItem[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public popoverController: PopoverController,
    private iab: InAppBrowser,
    private authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.list = [
      { name: 'Account Information', path: 'account-info' },
      { name: 'Notifications', path: 'notifications' },
      { name: 'Help Center', path: 'help-center', url: URLS.HELP_CENTER },
      // { name: 'Subscription Information', path: 'subscription' },
      { name: 'Legal Information', path: 'legal', url: URLS.LEGAL_INFORMATION },
      // { name: 'Log Out', path: '' },
    ];
  }

  public gotoPage(item: ISettingItem) {
    if (item.url) {
      const browser = this.iab.create(item.url, '_system');
      // (window as any).open(item.url, '_system', 'location=yes');
      return;
    }
    this.router.navigate([`${item.path}`]);
  }

  public async openConfirmation() {
    const popover = await this.popoverController.create({
      component: ConfirmPopupComponent,
      cssClass: 'logout-popover',
      componentProps: { data: popupText.LOGOUT },
      translucent: true
    });
    popover.present();

    await popover.onDidDismiss().then( (r) => {
      if (r.data) {
        this.authService.logout();
        this.router.navigate([`/`]);
        this.userService.getUserData().subscribe(userRes => {
          const user: IUser = userRes;
          (window as any).cordova.plugins.firebase.analytics.logEvent('logout', {
            userId: user.id,
            username: user.given_name,
            email: user.email
          });
        })
      }
    });
  }

}
