import { Component, OnInit } from '@angular/core';
import { ISermon } from '../shared/models/sermon';
import { PopoverController } from '@ionic/angular';
import { DataService } from '../shared/services/data.service';
import { Router } from '@angular/router';
import { ConfirmPopupComponent } from '../shared/components/confirm-popup/confirm-popup.component';
import { GlobalConstant, popupText } from '../constants';
import { zip } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  public isFavorites = false;
  public sermons: ISermon[];
  public filteredList: ISermon[];
  public topics: string[];
  public isLoad: boolean;
  public search = '';
  public keyword = '';
  public clearText;
  private handler: number;

  constructor(
    public popoverController: PopoverController,
    private dataService: DataService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.clearText = new Date(Date.now());
    this.search = '';
    this.fetchData();
  }

  ionViewWillLeave() {
    window.clearTimeout(this.handler);
  }

  public searchIsChange(text: string) {
    this.search = text;
    this.fetchData();
  }

  public filterByTopic(indx: number) {
    this.keyword = this.topics[indx];
    this.searchIsChange(this.search);
  }

  public gotoSermons() {
    this.router.navigate([`sermons`]);
  }

  public gotoTopics() {
    this.router.navigate([`topics`]);
  }

  public gotoSermonDetail(id: number) {
    this.router.navigate([`sermon-detail/${id}`]);
  }

  public async openConfirmation(sermonId: number) {
    const popover = await this.popoverController.create({
      component: ConfirmPopupComponent,
      cssClass: 'confirm-popover',
      componentProps: { data: popupText.UNLIKE_SERMON },
      translucent: true
    });
    popover.present();

    await popover.onDidDismiss().then( (r) => {
      if (r.data) {
        this.dataService.unLikeSermon(sermonId).subscribe(res => {
          this.sermons = this.sermons.filter(s => s.id !== res.id );
          this.fetchData();
        });
      }
    });
  }

  private fetchData() {
    this.isLoad = true;
    this.dataService.getFavoriteSermons(this.search, this.keyword).subscribe(res => {
      this.isLoad = false;
      this.filteredList = res.sermons.results;
      this.sermons = res.sermons.results;
      this.isFavorites = this.sermons.length > 0;
      this.getTopicList();
      this.getPastors();
    });
    this.handler = setTimeout(() => {
      if (this.isLoad) {
        this.router.navigate([`disconnect`]);
      }
    }, GlobalConstant.DISCONNECT_TIME_DETECT);
  }

  private getPastors() {
    const arr = [ ... new Set(this.sermons.map(s => s.pastor_id)) ].map(id => this.dataService.getPastorDetail(id));

    zip(arr).subscribe(res => {
      console.log(res);
    });

    return;
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
