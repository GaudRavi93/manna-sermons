import { Component, Input, OnInit } from '@angular/core';
import { IPastor } from '../../models/pastor';
import { IChurch } from '../../models/church';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AppLauncher, AppLauncherOptions } from '@ionic-native/app-launcher/ngx';

export interface ISocialItem {
  type: string;
  ico: string;
  handle: string;
  url: string
}

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
})
export class SocialComponent implements OnInit {
  @Input() set pastor(data: IPastor) {
    this.setSocial(data);
  }

  @Input() set church(data: IChurch) {
    this.setSocial(data);
  }

  public socialList: ISocialItem[];

  constructor(private iab: InAppBrowser,
              private appLauncher: AppLauncher) {
  }

  ngOnInit() {
  }

  public openSocial(item: ISocialItem) {
    const options: AppLauncherOptions = {};

      switch (item.type) {
        case 'FB':
          options.uri = `fb://facewebmodal/f?href=${item.url}/${item.handle}`;
          break;
        case 'Insta':
          options.uri = 'instagram://';
          break;
        case 'Tw':
          options.uri = 'twitter://';
          break;
        default:
          break;
    }

    return this.appLauncher.canLaunch(options)
      .then(() => {
        this.appLauncher.launch(options).then();
      })
      .catch(() => {
          this.iab.create(item.url + `/${item.handle}`, '_system');
        }
      );
  }

  private setSocial(data: IPastor | IChurch) {
    this.socialList = [
      { type: 'FB', ico: 'fb_p.svg', handle: data.facebook_handle, url: 'https://www.facebook.com' },
      { type: 'Insta', ico: 'insta_p.svg', handle: data.instagram_handle, url: 'https://www.instagram.com' },
      { type: 'Tw', ico: 'tw_p.svg', handle: data.twitter_handle, url: 'https://www.twitter.com' }
    ]
  }

}
