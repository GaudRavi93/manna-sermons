import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ConfirmPopupComponent } from '../../shared/components/confirm-popup/confirm-popup.component';
import { popupText } from '../../constants';
import { PayService } from '../../shared/services/pay.service';
import { IAPProduct } from '@awesome-cordova-plugins/in-app-purchase-2';


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {
  public d = Date.now();
  public product: IAPProduct;

  constructor(
    public popoverController: PopoverController,
    private pay: PayService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() { 
    this.product = this.pay.getProduct();
  }

  public async openConfirmation() {
    const popover = await this.popoverController.create({
      component: ConfirmPopupComponent,
      cssClass: 'unsubscribe-popover ',
      componentProps: { data: popupText.UNSUBSCRIBE },
      translucent: true
    });
    popover.present();

    await popover.onDidDismiss().then( (r) => {
      if (r.data) {
        // unsubscribe here
        this.pay.cancelSubscription();
      }
    });
  }

}
