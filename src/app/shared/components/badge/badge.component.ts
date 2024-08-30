import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent implements OnInit {
  @Input() text: string;
  @Input() id: number;
  @Input() type: string;
  @Input() isActive: boolean;
  @Output() onClickBadge = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {}

  public clickElem() {
    this.onClickBadge.emit(this.id);
  }

}
