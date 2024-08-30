import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkService {
  public onChangeDark = new Subject<boolean>();

  constructor() { }

  public isDark(): boolean {
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    // return prefersDark.matches;
    return false;
  }

  public init() {
    const self = this;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    toggleDarkTheme(prefersDark.matches);

    prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));

    function toggleDarkTheme(shouldAdd) {
      
      document.body.classList.toggle('dark', shouldAdd);
      self.onChangeDark.next(shouldAdd);
    }
  }
}
