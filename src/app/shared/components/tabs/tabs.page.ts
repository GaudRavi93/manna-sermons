import { ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DarkService } from '../../services/dark.service';
import { Platform } from '@ionic/angular';
import { EventService } from '../../services/event.service';

export interface IMenuItem { title: string; ico: string; darkIco: string; route: string, isActive?: boolean }

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  @Input() showTabs: boolean;
  public assets = '../../../assets/icon/';
  public currentTab: string;
  public menuList: IMenuItem[] = [];
  public isDark: boolean;
  public fixEnable: boolean;

  constructor(
    private router: Router,
    private darkService: DarkService,
    private eventService: EventService,
    private cdr: ChangeDetectorRef,
    private pl: Platform
  ) { }

  ngOnInit() {
    this.init();
    this.router.events.subscribe(val => {
 
      if (val instanceof NavigationEnd) {
        const url = val.urlAfterRedirects.replace('/', '');
        this.menuList.forEach(i => {
          if (i.route === url) {
            this.currentTab = i.title;
          }
        });
      }
    });

    this.darkService.onChangeDark.asObservable().subscribe(val => {
      this.isDark = val;
      this.cdr.detectChanges();
    });

    if (this.pl.is('android')) {
      this.eventService.openPay.subscribe((val) => {
        this.fixEnable = val;
      });
    }
  }

  public goto(route: string) {
    if (!route) {
      return;
    }

    this.router.navigate([route]);
  }

  public isActive(i: IMenuItem): boolean {
    return i.title === this.currentTab;
  }

  public setActive(e: Event, i: IMenuItem) {
    this.currentTab = i.title;
    e.preventDefault();
    e.stopPropagation();
  }

  public hidePadding() {
    this.fixEnable = false;
  }

  private init() {
    this.menuList = [
      { title: 'Home', route:'home', ico: 'home-p', darkIco: 'home-w.svg' },
      { title: 'Following', route:'following', ico: 'followers-p', darkIco: 'followers-w.svg' },
      { title: 'Favorites', route:'favorites', ico: 'favorite-p', darkIco: 'favorite-w.svg' },
      { title: 'Settings', route:'settings', ico: 'settings-p', darkIco: 'settings-w.svg' }
    ];
  }

}
