import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { IPopupText } from '../../../constants';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss'],
})
export class ConfirmPopupComponent implements OnInit {
  @Input() data: IPopupText;

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
  }

  public async close(val: boolean) {
    await this.popoverCtrl.dismiss(val);
  }

}
