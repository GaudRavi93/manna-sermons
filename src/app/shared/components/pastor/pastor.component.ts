import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPastor } from '../../models/pastor';

@Component({
  selector: 'app-pastor',
  templateUrl: './pastor.component.html',
  styleUrls: ['./pastor.component.scss'],
})
export class PastorComponent implements OnInit {
  @Input() pastor: IPastor;
  @Input() isShowUnfollow = false;
  @Input() isChurchPastor = false;
  @Input() isPadding = false;
  @Input() isShowTopLine;
  @Input() isShowBottomLine;

  @Output() unfollow = new EventEmitter<number>();
  @Output() showPastor = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {}

  public onUnfollow() {
    this.unfollow.emit(this.pastor.id);
  }

  public onShowPastor() {
    this.showPastor.emit(this.pastor.id);
  }

}
