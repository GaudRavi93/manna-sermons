import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
      private alertController: AlertController,
      public toastController: ToastController
  ) { }

  public async showAlert(message = '', header = 'Alert') {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header,
      // subHeader: 'Subtitle',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  public async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });

    toast.present();
  }
}
