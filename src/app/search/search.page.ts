import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../shared/services/navigation.service';
import { ISermon } from '../shared/models/sermon';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { Subscription } from 'rxjs';
import { IPastor } from '../shared/models/pastor';
import { IChurch } from '../shared/models/church';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  public sermons: ISermon[];
  public pastors: IPastor[];
  public churches: IChurch[];
  public scriptures: any[]; 
  public searchText = '';
  public nextPage: number;
  public enableInfinite: boolean;
  public placeholder = 'Find sermons by keyword, topics or pastors';
  public isShowNoFound: boolean;
  private querySubscription: Subscription;

  public activeCategory: string = 'All';
  public topics: string[] = ['Scriptures', 'Pastors', 'Churches', 'Sermons'];
  data: any;
  public topicCounts = {
    All: 0,
    Scriptures: 0,
    Pastors: 0,
    Churches: 0,
    Sermons: 0,
  };

  constructor(
    private nav: NavigationService,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.nextPage = 1;
    this.isShowNoFound = false;
    this.querySubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        this.searchText = queryParam.txt || '';
        this.fetchData();
      }
    );
  }

  public goBack() {
    this.isShowNoFound = false;
    this.nav.back();
    // this.router.navigate(['home']);
  }

  public gotoSermonDetail(id: number) {
    this.router.navigate([`sermon-detail/${id}`]);
  }

  public gotoPasterDetail(id: number) {
    this.router.navigate([`pastor-detail/${id}`]);
  }

  public gotoChurchDetail(id: number) {
    this.router.navigate([`church-detail/${id}`]);
  }

  public searchIsChange(text: string) {
    this.searchText = text;
    this.sermons = [];
    this.pastors = [];
    this.churches = [];
    this.scriptures = [];

    // this.router.navigate([], {
    //   queryParams: { txt: this.searchText },
    // });

    this.fetchData();
  }

  public fetchData(event = null, isLazy = false) {
    this.dataService.getSearchedData(this.searchText).subscribe(response => {
      const { sermons, pastors, churches, scriptures } = response;
      if (sermons) this.sermons = sermons;
      if (pastors) this.pastors = pastors;
      if (churches) this.churches = churches;
      if (scriptures) this.scriptures = scriptures;

      this.topicCounts.Sermons = sermons ? sermons.length : 0;
      this.topicCounts.Pastors = pastors ? pastors.length : 0;
      this.topicCounts.Churches = churches ? churches.length : 0;
      this.topicCounts.Scriptures = scriptures ? scriptures.length : 0;
      this.topicCounts.All = this.topicCounts.Sermons + this.topicCounts.Pastors + this.topicCounts.Churches + this.topicCounts.Scriptures;

      // this.nextPage = res.sermons.next_page;
      // const data = res.sermons.results;
      // this.sermons = isLazy ? this.sermons.concat(data) : data;
      // this.enableInfinite = res.sermons.current_page < res.sermons.total_pages;
      this.isShowNoFound = this.sermons.length < 1 && this.pastors.length < 1 && this.churches.length < 1 && this.scriptures.length < 1;
      if (event) {
        event.target.complete();
      }
    });
  }

  clearSearch() {
    this.searchText = '';
    this.searchIsChange(this.searchText);
  }

  onInputKeyup(event: any) {
    this.searchText = event.target.value;
  }

  public displayData(indx: number) {
    this.activeCategory = indx == -1 ? 'All' : this.topics[indx];
  }

}
