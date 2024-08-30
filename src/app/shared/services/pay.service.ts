import { IAPProduct, InAppPurchase2 } from '@awesome-cordova-plugins/in-app-purchase-2/ngx';
import { Injectable, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GlobalConstant } from '../../constants';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class PayService {
  private productId = GlobalConstant.SUBSCRIPTION_PRODUCT_NAME;
  private payInProcess: boolean;
  private product: IAPProduct;
  private isOnceTry = false;

  constructor(
    public pl: Platform,
    private router: Router,
    private zone: NgZone,
    private storageService: StorageService,
    private eventService: EventService,
    private store: InAppPurchase2
  ) {
    // this.init();
  }

  public isOk(): boolean {
    // for debug w/o pay
    // return true;

    if (this.product){
      return this.product.owned;
    }else{

      return false;
    }
    // return !this.product || this.product.owned; // || this.isOnceTry && this.product.currency === 'UAH';
  }

  public makePay() {
    if (this.payInProcess) {
      return;
    }
    this.isOnceTry = true;
    this.store.order(this.productId);
    // .then(() => {
    //   this.router.navigate(['home']);
    // });
    this.payInProcess = true;
    this.eventService.makePay();
  }

  public init() {
    // if (this.pl.is('android')) {
    //   return;
    // }

    // this.store.verbosity = this.store.DEBUG;
    this.store.register({
      id: this.productId,
      type: this.store.PAID_SUBSCRIPTION,
    });

    this.store.when(this.productId).approved((p: IAPProduct) => {
      p.finish();
      this.zone.run(() => {
        this.router.navigate(['home']);
      });
    });

    this.store.when(this.productId).expired(this.expired);

    this.store.error( (err) => {
      console.error('Store Error ' + JSON.stringify(err));
    });

    this.store.ready(() =>  {
    });

    // Updated
    this.store.when(this.productId).updated( (product: IAPProduct) => {
      // console.log('Updated>>>' + JSON.stringify(product));
      this.product = product;
      const url = decodeURI(window.location.href);
      if (product.owned && (url.includes('subscribe') || url.includes('registration'))) {
        this.zone.run(() => {
          this.router.navigate(['home']);
        });
      }
      // for test
      /*if (this.isOnceTry && this.product.currency === 'UAH') {
        setTimeout(() => {
          this.router.navigate(['home']);
        }, 7000)
      }*/
      this.payInProcess = false;
    });

    // User closed the native purchase dialog
    this.store.when(this.productId).cancelled( (product) => {
      console.error('Purchase was Cancelled', JSON.stringify(product));
      this.payInProcess = false;
      const url = decodeURI(window.location.href);
      if (product.owned && url.includes('subscribe')) {
        this.zone.run(() => {
          this.router.navigate(['home']);
        });
      } else {
        this.zone.run(() => {
          this.router.navigate(['home']);
        });
      }
    });
    this.store.refresh();
  }

  public cancelSubscription() {
    this.store.manageSubscriptions();
  }

  public getProduct(): IAPProduct {
    return this.product;
  }

  private expired() {
    this.router.navigate(['home']);
  }
}
