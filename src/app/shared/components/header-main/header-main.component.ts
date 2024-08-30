import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { DarkService } from '../../services/dark.service';

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss'],
})
export class HeaderMainComponent implements OnInit {
  @Input() title: string;
  @Input() showTabs = false;
  @Input() showBack = false;
  @Input() icoUrl: string;
  @Input() placeholder = 'Find sermons by keyword, topics or pastors';
  @Input() set clearText(val: number) {
    this.searchText = '';
  };

  @Input() showSearch = true;
  @Input() inputIsGradient: boolean;
  @Input() isInputDisable = false;
  @Output() searching = new EventEmitter<string>();
  @Output() tapSearch = new EventEmitter<string>();
  @Output() tabClick = new EventEmitter<string>();
  public isDark: boolean;
  public searchText = '';

  constructor(
    private router: Router,
    private nav: NavigationService,
    private cdr: ChangeDetectorRef,
    private darkService: DarkService
  ) { }

  ngOnInit() {
    this.isDark = this.darkService.isDark();

    this.darkService.onChangeDark.asObservable().subscribe(val => {
      this.isDark = val;
      this.cdr.detectChanges();
    });
  }

  public goBack() {
    this.nav.back();
  }

  public searchIsInFocus() {
    this.tapSearch.next();
  }

  public searchIsChange() {
    this.searching.emit(this.searchText);
  }

  public onClick(tab: string) {
    this.tabClick.emit(tab);
  }
}
