import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss'],
})
export class BioComponent implements OnInit {
  @Input() bio: string;
  public title = 'Full Bio';

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {}

  public async close() {
    await this.popoverCtrl.dismiss();
  }

}
