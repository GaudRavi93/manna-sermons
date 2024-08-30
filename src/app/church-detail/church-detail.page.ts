import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { IChurch } from '../shared/models/church';
import { DataService } from '../shared/services/data.service';
import { IPastor } from '../shared/models/pastor';
import { GlobalConstant } from '../constants';

@Component({
  selector: 'app-church-detail',
  templateUrl: './church-detail.page.html',
  styleUrls: ['./church-detail.page.scss'],
})
export class ChurchDetailPage implements OnInit {
  public church: IChurch;
  public pastors: IPastor[];
  public isLoad: boolean;
  private handler: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
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

  public showPastor(id: number) {
    this.router.navigate([`pastor-detail/${id}`]);
  }

  private fetchData(id: number) {
    this.dataService.getChurchDetail(id).subscribe(res => {
      this.church = res;

    });

    this.dataService.getChurchPastors(id).subscribe(res => {
      this.pastors = res.pastors.results;
      this.isLoad = false;
    })

    this.handler = setTimeout(() => {
      if (this.isLoad) {
        this.router.navigate([`disconnect`]);
      }
    }, GlobalConstant.DISCONNECT_TIME_DETECT);
  }

}
