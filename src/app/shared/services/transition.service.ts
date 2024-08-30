import { Injectable } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

@Injectable({
  providedIn: 'root'
})
export class TransitionService {
  private animateUrls = ['topics', 'churches', 'pastors', 'church-detail', 'pastor-detail'];

  constructor(
    private nativePageTransitions: NativePageTransitions,
  ) { }

  public animate(url) {
    const val = url.split('/')[1];

    if (!this.animateUrls.includes(val)) {
      return;
    }

    const options: NativeTransitionOptions = {
      direction: 'down',
      duration: 500,
      slowdownfactor: 3,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 60
    };
    const method = 'fade';

    this.nativePageTransitions[method](options)
      .then(() => {})
      .catch(err => { console.log(err) });
  }
}
