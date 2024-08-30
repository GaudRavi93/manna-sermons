import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { switchMap } from 'rxjs/operators';
import { ISermon } from '../shared/models/sermon';
import { IonContent } from '@ionic/angular';
import { IPastor } from '../shared/models/pastor';

@Component({
  selector: 'app-sermons',
  templateUrl: './sermons.page.html',
  styleUrls: ['./sermons.page.scss'],
})
export class SermonsPage implements OnInit {
  public sermons: ISermon[];
  public pastor: IPastor;
  public topics: string[];
  public search = '';
  public keyword = '';
  public nextPage: number;
  public enableInfinite: boolean;
  private pastorId: number;
  public isShowNoFound: boolean;

  @ViewChild(IonContent, { static: false }) content: IonContent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(switchMap(params => params.getAll('id'))).subscribe(data => {
      if (+data != 0) {
        this.pastorId = +data;
        this.fetchData();
      }
    });
    this.route.paramMap.pipe(switchMap(params => params.getAll('name'))).subscribe(data => {
      this.keyword = data;
      this.fetchData();
    });

    this.nextPage = 1;
  }

  ionViewDidEnter() {
    if (!this.route.routeConfig.path) {
      this.fetchData();
    }
    this.isShowNoFound = false;
  }

  public gotoSermonDetails(id: number) {
    this.nextPage = 1;
    this.router.navigate([`sermon-detail/${id}`]);
  }

  public searchIsChange(text: string) {
    this.search = text;
    this.nextPage = 1;
    this.fetchData();
  }

  public filterByTopic(indx: number) {
    this.keyword = this.topics[indx];
    // todo implement topic filter
    this.searchIsChange(this.search);
  }

  public fetchData(event = null, isLazy = false) {
    this.dataService.getSermons(this.pastorId, 13, this.nextPage, this.search, this.keyword).subscribe(res => {
      this.nextPage = res.sermons.next_page;
      const data = res.sermons.results;
      this.sermons = isLazy ? this.sermons.concat(data) : data;
      this.enableInfinite = res.sermons.current_page < res.sermons.total_pages;
      this.getTopicList();
      this.isShowNoFound = this.sermons.length < 1;
      if (event) {
        event.target.complete();
      }
    });
    if (!this.pastor && this.pastorId) {
      this.dataService.getPastorDetail(this.pastorId).subscribe(res => {
        this.pastor = res;
      });
    }

  }

  private getTopicList() {
    const arr = [];
    this.sermons.forEach(s => {
      s.keyword_list.forEach(kw => {
        arr.push(kw);
      })
    });
    this.topics = [ ... new Set(arr)];
  }

}
