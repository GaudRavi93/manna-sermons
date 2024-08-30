import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { ISermon } from '../shared/models/sermon';
import { IPastor } from '../shared/models/pastor';
import { PushService } from '../shared/services/push.service';
import { zip } from 'rxjs';
// import { ThisReceiver } from '@angular/compiler';

import { GlobalConstant } from '../constants';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public keywords: string[];
  public pastor: IPastor;
  public sermon: ISermon;
  public isLoad: boolean;
  public searchText: string;
  public clearText;
  private handler: number;

  constructor(
    private domSanitizer: DomSanitizer,
    private dataService: DataService,
    private pushService: PushService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.pushService.init();
  }

  ionViewDidEnter() {
    // window.location.reload();
    this.isLoad = true;
    this.fetchData();

  }

  ionViewWillLeave() {
    window.clearTimeout(this.handler);
  }

  public gotoSearch() {
    // this.goto('search');
  }

  public goto(page: string) {
    this.router.navigate([page], { state: { openDetails: true } });
  }

  public gotoTopicDetail(indx: number) {
    const name = this.keywords[indx];
    this.router.navigate([`topic-detail/${name}`]);
  }

  public gotoSermons(indx: number) {
    const name = this.keywords[indx];
    this.router.navigate([`sermons/0/${name}`]);
  }

  public showPastorDetail(id: number) {
    this.router.navigate([`pastor-detail/${id}`]);
  }

  public search(txt: string) {
    this.clearText = new Date(Date.now());
    if (!txt) {
      return;
    }

    this.router.navigate(['search'], { queryParams: { txt } });
  }
  private fetchData() {
    this.dataService.getTrendingSermonKeywords().subscribe(res => {
      this.keywords = res.keywords.results.map(kw => kw.name);
    });

    // get video from followed pastors
    this.dataService.getFollowedPastors().subscribe(res => {
      if (res.pastors.results.length < 1) {
        this.dataService.getRecentVideo().subscribe(response => {
          const sermon: ISermon = response.sermons.results[0];
          this.sermon = sermon;

          this.dataService.getPastorDetail(sermon.pastor_id).subscribe(pastor => {
            this.sermon.video.pastor_photo_url = pastor.photo_url;
          });
        });

        return;
      }
      const arr = res.pastors.results.map(p => this.dataService.getRecentVideoByPastorId(p.id));
      zip(...arr).subscribe(response => {
        const list = [];
        response.forEach(r => {
          list.push(r.sermons.results[0]);
        });

        list.sort((a, b) => {
          const aa = new Date(a.video.created_at);
          const bb = new Date(b.video.created_at);
          return aa > bb ? 1 : aa === bb ? 0 : -1;
        });

        this.sermon = list[0];

        this.dataService.getPastorDetail(list[0].pastor_id).subscribe(pastor => {
          this.sermon.video.pastor_photo_url = pastor.photo_url;
        });

      });
    });

    this.dataService.getFeaturedPastor().subscribe(res => {
      this.pastor = res;

      this.dataService.getChurchDetail(res.church_id).subscribe(r => {
        this.pastor.churchName = r.name;
      });

      this.dataService.getSermons(this.pastor.id, 1).subscribe(re => {
        this.isLoad = false;
        this.pastor.sermons = re.sermons.results.length > 0 ? re.sermons.total_pages: 0;
      });
    });


    this.handler = setTimeout(() => {
      if (this.isLoad) {
        this.router.navigate([`disconnect`]);
      }
    }, GlobalConstant.DISCONNECT_TIME_DETECT);
  }

}
