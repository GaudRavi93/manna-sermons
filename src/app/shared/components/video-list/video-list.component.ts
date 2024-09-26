import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISermon } from '../../models/sermon';
import { DataService } from '../../services/data.service';
import { IPastor } from '../../models/pastor';
import { IChurch } from '../../models/church';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent implements OnInit {
  @Input() set sermons(val: ISermon[]) {
    this.sermonList = val;
    this.getPastorsDetail();
  };
  @Input() set pastors(val: IPastor[]) {
    this.pastorList = val;
  }
  @Input() set churches(val: IChurch[]) {
    this.churchList = val;
  }
  @Input() set scriptures(val: any[]) {
    this.scriptureList = val;
  }
  @Input() showArrow: boolean;
  @Input() showTrash: boolean;
  @Input() title!: string;
  @Output() onClick = new EventEmitter<number>();
  @Output() onClickVideo = new EventEmitter<number>();
  @Output() onClickPreview = new EventEmitter<number>();

  public sermonList: ISermon[];
  public pastorList: IPastor[];
  public churchList: IChurch[];
  public scriptureList: any[];
  public pastorMap = {};

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {}

  public isClick(id: number) {
    this.onClick.emit(id);
  }

  public isClickInfo(id: number) {
    this.onClickVideo.emit(id);
  }

  public isClickPreview(id: number) {
    this.onClickPreview.emit(id);
  }

  private getPastorsDetail() {
    if (!this.sermonList) {
      return;
    }

    const ids = this.sermonList.map(s => s.pastor_id);
    this.dataService.getPastorsDetails(ids).then(res => {
      res.forEach(p => {
        this.pastorMap[p.id] = `| ${p.given_name} ${p.family_name}`;
      });
    });
  }

  handleImageError(p){
    p.photo_url = '';
  }
}
