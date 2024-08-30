import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { NavigationService } from '../shared/services/navigation.service';
import { EventService } from '../shared/services/event.service';
import { IPastor } from '../shared/models/pastor';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-pastors',
  templateUrl: './pastors.page.html',
  styleUrls: ['./pastors.page.scss'],
})
export class PastorsPage implements OnInit {
  public pastors: IPastor[];
  public search = '';
  public charList: string[];
  public nextPage: number;
  public enableInfinite: boolean;
  private isOpenDetails: boolean;

  @ViewChild(IonContent, { static: false }) content: IonContent;

  constructor(
    private router: Router,
    private dataService: DataService,
    private nav: NavigationService,
    private eventService: EventService,
  ) { }

  ngOnInit() {
    this.isOpenDetails = this.router.getCurrentNavigation().extras.state?.openDetails;
  }

  ionViewDidEnter() {
    this.content.scrollToTop(10);
    this.nextPage = 1;
    this.fetchData();
  }

  public choosePastor(id: number) {
    const pastor = this.pastors.filter(p => p.id === id)[0];
    this.router.navigate([`pastor-detail/${id}`], { state: { pastor } });
    return;

    /*if (this.isOpenDetails) {
      this.router.navigate([`pastor-detail/${p.id}`], { state: { pastor: p } });
      return;
    }
    this.eventService.updatePastor(p);
    this.nav.back();*/
  }

  public searchIsChange(txt: string) {
    this.search = txt;
    this.nextPage = 1;
    this.fetchData();
  }

  private insertChar(data: IPastor[]): IPastor[] {
    const res = [] as IPastor[];
    let currentChar = '';
    this.charList = [];
    data.forEach(ch => {
      if (!ch.family_name) {
        currentChar = ch.char;
        this.charList.push(ch.char);
        res.push(ch);
        return;
      }

      const char = ch.family_name.charAt(0).toUpperCase();
      if (currentChar !== char) {
        currentChar = char;
        this.charList.push(char);
        res.push({ char } as IPastor);
      }
      res.push(ch);
    });

    return res;
  }

  public fetchData(event = null, isLazy = false) {
    this.dataService.getPastors(this.search, this.nextPage).subscribe(res => {
      this.nextPage = res.pastors.next_page;
      const data = res.pastors.results;
      this.pastors = this.insertChar(isLazy ? this.pastors.concat(data) : data);
      this.enableInfinite = res.pastors.current_page < res.pastors.total_pages;
      if (event) {
        event.target.complete();
      }
    });
  }

}
