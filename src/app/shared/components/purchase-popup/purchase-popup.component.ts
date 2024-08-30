import { Component, OnInit } from '@angular/core';
import { PayService } from '../../services/pay.service';

@Component({
  selector: 'app-purchase-popup',
  templateUrl: './purchase-popup.component.html',
  styleUrls: ['./purchase-popup.component.scss'],
})
export class PurchasePopupComponent implements OnInit {

  constructor(private pay: PayService) { }

  ngOnInit() {}

  cancelSubscription(){
    // console.log("cancel subscription");
    this.pay.cancelSubscription();
  }
}
