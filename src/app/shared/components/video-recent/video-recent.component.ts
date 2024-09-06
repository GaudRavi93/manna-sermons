import { Component, Input, OnInit } from '@angular/core';
import { ISermon } from '../../models/sermon';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-video-recent',
  templateUrl: './video-recent.component.html',
  styleUrls: ['./video-recent.component.scss'],
})
export class VideoRecentComponent implements OnInit {
  @Input() sermon: ISermon;
  @Input() showPastorImg = true;

  constructor(
    private router: Router,
    private pl: Platform
  ) { }

  ngOnInit() {}

  public openSermonDetail() {
    this.pl.ready().then(() => {
      (window as any).cordova.plugins.firebase.analytics.
      logEvent('play_button', {
          sermon_id: this.sermon.id,
      });
    });
    this.router.navigate([`sermon-detail/${this.sermon.id}`]);
  }

}
