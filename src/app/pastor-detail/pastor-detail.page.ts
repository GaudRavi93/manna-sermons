import { Component, OnInit } from '@angular/core';
import { IPastor } from '../shared/models/pastor';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { PopoverController } from '@ionic/angular';
import { BioComponent } from '../shared/components/bio/bio.component';
import { ISermon } from '../shared/models/sermon';
import { GlobalConstant } from '../constants';

@Component({
  selector: 'app-pastor-detail',
  templateUrl: './pastor-detail.page.html',
  styleUrls: ['./pastor-detail.page.scss'],
})
export class PastorDetailPage implements OnInit {
  public pastor: IPastor;
  public sermons: ISermon[];
  public topics: string[];
  public isLoad: boolean;
  private handler: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    public popoverController: PopoverController,
  ) { }

  ngOnInit() {
    this.isLoad = true;
    this.route.paramMap.pipe(switchMap(params => params.getAll('id'))).subscribe(data => {
      this.fetchData(+data);
    });
  }

  ionViewWillLeave() {
    window.clearTimeout(this.handler);
  }

  public follow(pastorId: number) {
    const method = this.pastor.followed ? 'unFollowPastor' : 'followPastor';

    this.dataService[method](pastorId).subscribe(res => {
      // todo: this is backend bug, remove lines after fixed
      res.sermons = this.pastor.sermons;
      res.churchName = this.pastor.churchName;

      this.pastor = res;
    });
  }

  public gotoSermons() {
    this.router.navigate([`sermons/${this.pastor.id}`], { state: { openDetails: true } });
  }

  public async showBio() {
    const popover = await this.popoverController.create({
      component: BioComponent,
      cssClass: 'bio-popover',
      componentProps: { bio: this.pastor.bio },
      translucent: true
    });

    await popover.present();
  }

  private fetchData(id: number) {
    this.dataService.getPastorDetail(id).subscribe(res => {
      this.pastor = res;

      this.dataService.getChurchDetail(this.pastor.church_id).subscribe(res => {
        this.pastor.churchName = res.name;
      });

      this.dataService.getSermons(this.pastor.id, 1).subscribe(re => {
        this.pastor.sermons = re.sermons.results.length > 0 ? re.sermons.total_pages: 0;
      });

      this.dataService.getSermons(this.pastor.id, 2).subscribe(re => {
        this.sermons = re.sermons.results.map(s => {
          s.video.pastor_photo_url = this.pastor.photo_url;
          return s;
        });

        this.isLoad = false;
        this.getTopicList();
      });

      this.handler = setTimeout(() => {
        if (this.isLoad) {
          this.router.navigate([`disconnect`]);
        }
      }, GlobalConstant.DISCONNECT_TIME_DETECT);
    });
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
