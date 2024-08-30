import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { switchMap } from 'rxjs/operators';
import { ISermon } from '../shared/models/sermon';
import { IPastor } from '../shared/models/pastor';
import { GlobalConstant } from '../constants';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { UserService } from '../shared/services/user.service';
import { IUser } from '../shared/models/user';

@Component({
  selector: 'app-sermon-detail',
  templateUrl: './sermon-detail.page.html',
  styleUrls: ['./sermon-detail.page.scss'],
})
export class SermonDetailPage implements OnInit {
  public sermon: ISermon;
  public pastor: IPastor;
  public refresher = 0;
  private handle;
  private videoId: number;
  private user: IUser;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private socialSharing: SocialSharing,
    private dataService: DataService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(switchMap(params => params.getAll('id'))).subscribe(data => {
      this.videoId = +data;
      this.fetchData(+data);
    });
    this.userService.getUserData().subscribe(user => {
      this.user = user;
    });
  }

  ionViewWillLeave() {
    clearTimeout(this.handle);
  }

  ionViewDidEnter() {
    this.activeCounterForSetView();
  }

  public like() {
    const method = this.sermon.liked ? 'unLikeSermon' : 'likeSermon';
    this.dataService[method](this.sermon.id).subscribe(res => {
      this.sermon = res;
    });
  }

  public unlike() {
    this.dataService.unLikeSermon(this.sermon.id).subscribe(res => {
      this.sermon = res;
    });
  }

  public share() {
    // const url = `https://www.youtube.com/watch?v=${this.sermon.video.video_key}`;
    // const text = `Check out this sermon from Manna. Get Manna - Sermons for the Soul at mannasermons.com. Watch the sermon ${this.sermon.title} at ${url}`;
    const url = `https://app.mannasermons.com?videoId=${this.videoId}`;
    const text = `Check out this impactful message ‘${this.sermon.title}’ by ${this.pastor.given_name} ${this.pastor.family_name}.\nView it on Manna - Sermons for the Soul ${url}\n\n\nPlease forward to friends & family!`;
    this.socialSharing.share(text, this.sermon.description).then(r => {
    });
  }

  public showPastorDetail(id: number) {
    this.router.navigate([`pastor-detail/${id}`]);
  }

  private activeCounterForSetView() {
     this.handle = setTimeout(() => {
      this.dataService.viewedSermon(this.sermon.id).subscribe(res => {
        this.sermon = res;
      });
    }, GlobalConstant.TIME_FOR_VIDEO_VIEW * 1000)
  }

  private fetchData(id: number) {
    this.dataService.getSermonDetail(id).subscribe(res => {
      this.sermon = res;
      this.refresher++;


      this.dataService.getPastorDetail(res.pastor_id).subscribe(r => {
        this.pastor = r;
      });
    });
  }

}
