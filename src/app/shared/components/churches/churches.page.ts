import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { IChurch } from '../../models/church';
import { NavigationService } from '../../services/navigation.service';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-churches',
  templateUrl: './churches.page.html',
  styleUrls: ['./churches.page.scss'],
})
export class ChurchesPage implements OnInit {
  public churches: IChurch[];
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

  public chooseChurch(ch: IChurch) {
    if (this.isOpenDetails) {
      this.router.navigate([`church-detail/${ch.id}`], { state: { church: ch} });
      return;
    }
    this.eventService.updateChurch(ch);
    this.nav.back();
  }

  public searchIsChange(txt: string) {
    this.search = txt;
    this.nextPage = 1;
    this.fetchData();
  }

  private insertChar(data: IChurch[]): IChurch[] {
    const res = [] as IChurch[];
    let currentChar = '';
    this.charList = [];
    data.forEach(ch => {
      if (!ch.name) {
        currentChar = ch.char;
        this.charList.push(ch.char);
        res.push(ch);
        return;
      }

      const char = ch.name.charAt(0).toUpperCase();
      if (currentChar !== char) {
        currentChar = char;
        this.charList.push(char);
        res.push({ char } as IChurch);
      }
      res.push(ch);
    });

    return res;
  }

  public fetchData(event = null, isLazy = false) {
    this.dataService.getChurches(this.search, this.nextPage).subscribe(res => {
      this.nextPage = res.churches.next_page;
      const data = res.churches.results;
      this.churches = this.insertChar(isLazy ? this.churches.concat(data) : data);
      this.enableInfinite = res.churches.current_page < res.churches.total_pages;
      if (event) {
        event.target.complete();
      }
    })
  }

}
