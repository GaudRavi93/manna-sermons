import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../shared/services/navigation.service';

@Component({
  selector: 'app-disconnect',
  templateUrl: './disconnect.page.html',
  styleUrls: ['./disconnect.page.scss'],
})
export class DisconnectPage implements OnInit {

  constructor(
    private nav: NavigationService,
  ) { }

  ngOnInit() {
  }

  public retry() {
    this.nav.back();
  }

}
