import { Component, OnInit } from '@angular/core';
import { LoadingController, PopoverController } from '@ionic/angular';
import { ConfirmPopupComponent } from '../shared/components/confirm-popup/confirm-popup.component';
import { GlobalConstant, popupText } from '../constants';
import { IPastor } from '../shared/models/pastor';
import { DataService } from '../shared/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-following',
  templateUrl: './following.page.html',
  styleUrls: ['./following.page.scss'],
})
export class FollowingPage implements OnInit {
  public isFollowingPastors = false;
  public pastors: IPastor[];
  public filteredList: IPastor[];
  public isLoad: boolean;
  public search = '';
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
    this.fetchData();
  }

  ionViewWillLeave() {
    window.clearTimeout(this.handler);
  }

  public gotoPastors() {
    this.router.navigate(['pastors'], { state: { openDetails: true } });
  }

  public gotoPastor(id: number) {
    this.router.navigate([`pastor-detail/${id}`]);
  }

  public unfollow(id: number) {
    this.openConfirmation(id);
  }

  public searchIsChange(txt: string) {
    this.search = txt;
    this.filteredList = this.pastors.filter(p => {
      const txt = this.search.toLowerCase();

      return p.family_name.toLowerCase().includes(txt) ||
        p.given_name.toLowerCase().includes(txt) ||
        p.city.toLowerCase().includes(txt) ||
        p.state.toLowerCase().includes(txt);
    });

    this.isFollowingPastors = this.filteredList.length > 0;
  }

  public async openConfirmation(pastorId: number) {
    const popover = await this.popoverController.create({
      component: ConfirmPopupComponent,
      cssClass: 'confirm-popover',
      componentProps: { data: popupText.UNFOLLOW_PASTOR },
      translucent: true
    });
    popover.present();

    await popover.onDidDismiss().then( (r) => {
      if (r.data) {
        this.dataService.unFollowPastor(pastorId).subscribe(res => {
          this.pastors = this.pastors.filter(p => p.id !== res.id );
          this.fetchData();
        });
      }
    });
  }

  private fetchData() {
    this.isLoad = true;
    this.clearText = new Date(Date.now());

    this.dataService.getFollowedPastors().subscribe(res => {
      this.isLoad = false;
      this.pastors = res.pastors.results;
      this.searchIsChange('');
    });

    this.handler = setTimeout(() => {
      if (this.isLoad) {
        this.router.navigate([`disconnect`]);
      }
    }, GlobalConstant.DISCONNECT_TIME_DETECT);
  }
}
