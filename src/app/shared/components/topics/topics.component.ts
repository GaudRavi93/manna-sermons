import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  @Input() set topics (val: string[]) {
    if (!val) {
      return;
    }
    this.topicList = val;
  

    setTimeout(()=> {
      const counter = parseInt(sessionStorage.getItem('m-counter'), 10) || 0;
      sessionStorage.setItem('m-counter', JSON.stringify(counter + 1));
      this.init(counter);
    }, 4);
  };
  @Input() set clearActive (val: number) {
    if (val !== 0) {
      // this.active = null;
    }
  };
  @Input() active: string;
  @Input() title: string;
  @Input() isShowAll: boolean;
  @Input() allowActive: boolean;
  @Input() noBackground: boolean;
  @Input() isHome: boolean;
  @Input() isSearch: boolean;
  @Input() topicCounts: any;
  @Output() setActive = new EventEmitter<number>();

  public slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  public topicList: string[];
  public counter = 1;
  private startX = 0;
  private contWidth = 0;
  private viewWidth = 0;
  private lastWidth = 0;
  private isMoved = false;
  private boxWishes: Element;

  private categoryStartTime: number;

  constructor(
    private pl: Platform
  ) {
  }

  ngOnInit() {
    if (this.allowActive && this.isShowAll) {
      this.active = 'All';
    }
    if(this.topicList && this.topicList.length > 0) {
      const categories = JSON.stringify(this.topicList);
      this.pl.ready().then(() => {
        (window as any).cordova.plugins.firebase.analytics.logEvent('categories', { param1: categories });
      });
    }
  }

  public changeActive(indx: number) {
    this.setActive.emit(indx);
    this.active = this.allowActive ?
    indx == -1 ? 'All' : this.topicList[indx] : '';
    this.logCategoryStart(this.topicList[indx]);
  }

  private logCategoryStart(category: string) {
    this.categoryStartTime = new Date().getTime();
    (window as any).cordova.plugins.firebase.analytics.logEvent('category_start', {
      'category': category,
      'startTime': this.categoryStartTime
    });
  }

  private handleTouchStart(e) {
    let touchObj = (e as any).changedTouches[0];
    this.startX = parseInt(touchObj.clientX);
    this.isMoved = false;
    e.preventDefault()
  }

  private handleTouchEnd(e) {
    if (this.isMoved) {
      return;
    }
    const id = e.target.getAttribute('id').replace('manna', '');
    this.changeActive(id);
  }

  private handleTouchMove(e) {
    let touchObj = (e as any).changedTouches[0],
      dist = parseInt(touchObj.clientX) - this.startX;

    const left: number = this.getProp(this.boxWishes, 'left');

    if (left + dist > 20 || (left + dist - this.viewWidth) * -1 > this.contWidth) {
      return;
    }
    (this.boxWishes as any).style.left = left + dist + 'px';

    (window as any).scrollBy(-dist, 0);
    this.startX = parseInt(touchObj.clientX);
    this.isMoved = true;
    e.preventDefault()
  }

  private init(counter) {
    this.counter = counter;
    const prevBox = document.querySelector(`.content-${this.counter}`);

    if (prevBox) {

      prevBox.removeEventListener('touchstart', this.handleTouchStart, false);
      prevBox.removeEventListener('touchmove', this.handleTouchMove, false);
      prevBox.removeEventListener('touchend', this.handleTouchEnd, false);
    }

    this.counter++;

    setTimeout(() => {
      this.boxWishes = document.querySelector(`.content-${this.counter}`);
      if (!this.boxWishes) {
        return;
      }
      let container = document.querySelector(`.container-${this.counter}`);
      let lastItem = this.boxWishes.querySelector(`app-badge:last-of-type`);

      this.contWidth = this.getProp(this.boxWishes);
      this.viewWidth = this.getProp(container);
      this.lastWidth = this.getProp(lastItem);

      (this.boxWishes as any).style.left = '20px';

      this.startX = 0;

      this.boxWishes.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
      this.boxWishes.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
      this.boxWishes.addEventListener('touchend', this.handleTouchEnd.bind(this), false);

    }, 10);
  }

  private getProp(el, prop = 'width'): number {
    return parseInt(window.getComputedStyle(el, null).getPropertyValue(prop).split('px')[0]) || 0;
  }
}
