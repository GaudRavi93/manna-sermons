import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { switchMap } from 'rxjs/operators';
import { ISermon } from '../shared/models/sermon';
import { IFilter } from '../shared/models/common';
import { IonContent } from '@ionic/angular';
import { GlobalConstant } from '../constants';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.page.html',
  styleUrls: ['./topic-detail.page.scss'],
})
export class TopicDetailPage implements OnInit {
  public topicName: string;
  public sermons: ISermon[];
  public filteredList: any;
  public options: string[];
  public clearActive = 0;
  public nextPage: number;
  public enableInfinite: boolean;
  public isLoad: boolean;
  public isShowNoFound: boolean;
  private firstPart = '';
  private handler: number;

  private filter: IFilter = {} as IFilter;
  public startTime: number;

  @ViewChild(IonContent, { static: false }) content: IonContent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
  ) {
    this.initFilter();
    this.options = ['Most Popular', 'Oldest to Newest', 'Newest to Oldest'];
  }

  ngOnInit() {
    this.route.paramMap.pipe(switchMap(params => params.getAll('id'))).subscribe(data => {
      data = (data as any).replaceAll('%2f', '/');
      this.topicName = data;
      this.startTime = new Date().getTime();
      const formattedTime = new Date(this.startTime).toLocaleString();
    
      (window as any).cordova.plugins.firebase.analytics.logEvent('Topic_'+this.topicName, {
        'topic': this.topicName,
        'startTime': formattedTime
      });
      
      this.firstPart = data;
      this.fetchData();
    });
    this.route.paramMap.pipe(switchMap(params => params.getAll('id2'))).subscribe(data => {
      this.topicName = this.firstPart + '/' + data;
      this.fetchData();
    });
    this.isShowNoFound = false;
    this.clearActive = 0;
  }

  ngOnDestroy() {
    const endTime = new Date().getTime();
    const durationInMillis = endTime - this.startTime;
    const durationInSeconds = Math.floor(durationInMillis / 1000) + ' sec';
    const formattedEndTime = new Date(endTime).toLocaleString();
    
    (window as any).cordova.plugins.firebase.analytics.logEvent('Topic_End_' + this.topicName, {
      'topic': this.topicName,
      'endTime': formattedEndTime,
      'duration': durationInSeconds
    });
  }

  ionViewDidEnter() {
    this.isLoad = true;
    this.content.scrollToTop(10);
    this.nextPage = 1;
    this.fetchData();
  }

  ionViewWillLeave() {
    window.clearTimeout(this.handler);
  }

  public searchIsChange(val: string) {
    this.filter.searchStr = val;
    this.nextPage = 1;
    this.fetchData();
  }

  public filterByTopic(indx: number) {
    this.initFilter(this.filter.searchStr);
    if (indx < 0) {
      this.initFilter();
    } else if (indx === 0) {
      this.filter.popular = true;
    } else if (indx === 1) {
      this.filter.sort = 'asc';
    } else if (indx == 2) {
      this.filter.sort = 'desc';
    }
    this.fetchData();
  }

  public gotoSermonDetail(id: number) {
    this.router.navigate([`sermon-detail/${id}`]);
  }

  public fetchData(event = null, isLazy = false) {
    this.clearActive = 0;
    this.isLoad = true;
    this.dataService.getTopicDetail(this.topicName, this.filter, this.nextPage).subscribe(res => {
      this.nextPage = res.sermons.next_page;
      this.enableInfinite = res.sermons.current_page < res.sermons.total_pages;
      if (event) {
        event.target.complete();
      }

      const data = res.sermons.results;
      this.sermons = isLazy ? this.sermons.concat(data) : data;
      this.isLoad = false;

      // get type Anxiety/Worry
      if (this.sermons.length < 1 && this.nextPage == 1 && this.isFirstCharIsNotCapitalize(this.topicName)) {
        this.topicName = this.capitalizeFirstChar(this.topicName);
        this.fetchData();
      }

      this.isShowNoFound = !this.isLoad && this.sermons.length < 1;
      if (this.isShowNoFound) {
        this.clearActive++;
      }
    });

    this.handler = setTimeout(() => {
      if (this.isLoad) {
        this.router.navigate([`disconnect`]);
      }
    }, GlobalConstant.DISCONNECT_TIME_DETECT);
  }

  private isFirstCharIsNotCapitalize(txt: string): boolean {
    const char = txt.charAt(0);
    return char.toLowerCase() === char;
  }

  private capitalizeFirstChar(txt: string): string {
    return txt.charAt(0).toUpperCase() + txt.slice(1);
  }

  private initFilter(searchStr = '') {
    this.filter = { searchStr, sort: 'asc', popular: false };
  }
}
