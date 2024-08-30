import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../shared/services/navigation.service';
import { ISermon } from '../shared/models/sermon';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  public sermons: ISermon[];
  public searchText = '';
  public nextPage: number;
  public enableInfinite: boolean;
  public placeholder = 'Find sermons by keyword, topics or pastors';
  public isShowNoFound: boolean;
  private querySubscription: Subscription;

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
      }
    );
  }

  public goBack() {
    this.isShowNoFound = false;
    this.nav.back();
  }

  public gotoSermonDetail(id: number) {
    this.router.navigate([`sermon-detail/${id}`]);
  }

  public searchIsChange(text: string) {
    this.searchText = text;
    this.nextPage = 1;
    this.fetchData();
  }

  public fetchData(event = null, isLazy = false) {
    this.dataService.getSermons(null, 25, this.nextPage, this.searchText).subscribe(res => {
      this.nextPage = res.sermons.next_page;
      const data = res.sermons.results;
      this.sermons = isLazy ? this.sermons.concat(data) : data;
      this.enableInfinite = res.sermons.current_page < res.sermons.total_pages;
      this.isShowNoFound = this.sermons.length < 1;
      if (event) {
        event.target.complete();
      }
    });
  }

}
