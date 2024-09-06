import { Component, OnInit, ViewChild } from '@angular/core';
import { ITopic } from '../shared/models/topic';
import { Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { IonContent, Platform } from '@ionic/angular';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.page.html',
  styleUrls: ['./topics.page.scss'],
})
export class TopicsPage implements OnInit {
  public topics: ITopic[];
  public filteredList: ITopic[];
  public search = '';
  public nextPage: number;
  public enableInfinite: boolean;

  @ViewChild(IonContent, { static: false }) content: IonContent;

  constructor(
    private router: Router,
    private dataService: DataService,
    private pl: Platform
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.content.scrollToTop(10);
    this.nextPage = 1;
    this.fetchData();
  }

  public gotoTopicDetail(name: string) {
    name = (name as any).replaceAll('/', '%2f');
    this.router.navigate([`topic-detail/${name}`]);
  }

  public searchIsChange(str: string) {
    this.search = str;
    this.nextPage = 1;
    this.fetchData();
  }

  public fetchData(event = null, isLazy = false) {
    this.dataService.getTopics(this.search, this.nextPage).subscribe(res => {
      this.nextPage = res.topics.next_page;
      const data = res.topics.results;
      this.topics = isLazy ? this.topics.concat(data) : data;
      const topics = JSON.stringify(this.topics);
      this.pl.ready().then(() => {
        (window as any).cordova.plugins.firebase.analytics.logEvent('topics-data', { param1: topics });
      });
      this.enableInfinite = res.topics.current_page < res.topics.total_pages;
      if (event) {
        event.target.complete();
      }
    });
  }

}
