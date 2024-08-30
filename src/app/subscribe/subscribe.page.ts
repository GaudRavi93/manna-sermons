import { Component, OnInit } from '@angular/core';
import { PayService } from '../shared/services/pay.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { URLS } from '../constants';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.page.html',
  styleUrls: ['./subscribe.page.scss'],
})
export class SubscribePage implements OnInit {
  public eulaURL = URLS.EULA;
  public privacyPolicyURL = URLS.PRIVACY_POLICY;

  constructor(
    private pay: PayService,
    private iab: InAppBrowser,
  ) { }

  ngOnInit() {
  }

  public makePay() {
    this.pay.makePay();
  }

  public openURL(url: string) {
    const browser = this.iab.create(url, '_system');
  }

}
