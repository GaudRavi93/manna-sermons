import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IChurch } from '../models/church';
import { IPastor } from '../models/pastor';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public newChurch = new Subject<IChurch>();
  public newPastor = new Subject<IPastor>();
  public openPay = new Subject<boolean>();

  constructor() { }

  public updateChurch(ch: IChurch) {
    this.newChurch.next(ch);
  }

  public updatePastor(p: IPastor) {
    this.newPastor.next(p);
  }

  public makePay(val = true) {
    this.openPay.next(val);
  }

  public heightChanged(val = true) {
    this.openPay.next(val);
  }
}
