import { Component, Input, OnInit } from '@angular/core';
import { ISermon } from '../../models/sermon';
import { Router } from '@angular/router';

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
  ) { }

  ngOnInit() {}

  public openSermonDetail() {
    this.router.navigate([`sermon-detail/${this.sermon.id}`]);
  }

}
