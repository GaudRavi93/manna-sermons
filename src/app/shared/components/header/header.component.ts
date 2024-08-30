import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { IChurch } from '../../models/church';
import { IPastor } from '../../models/pastor';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() backPath: string;
  @Input() church: IChurch;
  @Input() pastor: IPastor;
  @Input() showSave: boolean;
  @Input() isSaveActive: boolean;
  @Input() isLoad: boolean;
  @Output() save = new EventEmitter();

  constructor(
    private router: Router,
    private iab: InAppBrowser,
    private nav: NavigationService,
  ) { }

  ngOnInit() {}

  public goBack() {
    if (this.backPath) {
      this.router.navigate([this.backPath]);
      return;
    }
    this.nav.back();
  }

  public onClickSave() {
    this.save.emit();
  }

  public onClickShowChurch(id: number) {
    this.router.navigate([`church-detail/${id}`]);
  }

  public socialIsPresent() {
    return this.church.facebook_handle || this.church.instagram_handle || this.church.twitter_handle;
  }

  public openExternalBrowser(url) {
    const browser = this.iab.create(url, '_system');
    return false;
  }

}
