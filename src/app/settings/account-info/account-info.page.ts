import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { IUser } from '../../shared/models/user';
import { StatePickerComponent } from '../../shared/components/state-picker/state-picker.component';
import { IonContent, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { EventService } from '../../shared/services/event.service';
import { IChurch } from '../../shared/models/church';
import { States } from '../../constants';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.page.html',
  styleUrls: ['./account-info.page.scss'],
})
export class AccountInfoPage implements OnInit {
  public user: IUser;
  public saveIsActive: boolean;
  public isVisiblePass = false;
  private subscriberList: Subscription[] = [];
  private isPickChurch: boolean;
  public isShowCustomChurch = false;
  // public isChurchEmpty = true;
  public notAff = false;
  public church: IChurch;
  @ViewChild(IonContent, {read: IonContent, static: false}) myContent: IonContent;

  constructor(
    private router: Router,
    private dataService: DataService,
    private userService: UserService,
    private eventService: EventService,
    public popoverController: PopoverController,
  ) { }

  ngOnInit() {
    this.subscriberList.push(this.eventService.newChurch.asObservable().subscribe(res => {
      this.user.church_id = res.id;
      this.user.church_name = res.name;
      this.isChangeUser();
    }));
  }


  ionViewDidEnter() {
    if (!this.isPickChurch) {
      this.fetchData();
    } else {
      setTimeout(() => {
        this.myContent.scrollToBottom(300);
      }, 300);

    }
    this.isPickChurch = false;
  }

  ngOnDestroy() {
    this.subscriberList.forEach(s => s.unsubscribe());
    this.subscriberList = [];
  }

  public updateAcc() {
    if (!this.saveIsActive) {
      return;
    }
    this.userService.updateUserData(this.user).subscribe(res => {
      this.saveIsActive = false;
    });

  }

  public gotoChurchPicker() {
    this.isPickChurch = true;
    this.router.navigate(['churches']);
  }
  public async openPicker(category = 0) {
    const popover = await this.popoverController.create({
      component: StatePickerComponent,
      cssClass: 'state-picker-popover',
      componentProps: {pickerCategory: category},
      translucent: true
    });
    popover.present();

    await popover.onDidDismiss().then( (r) => {
      if (r && r.data) {
        this.isChangeUser();
        if (category === 0) {
          this.user.state = r.data.value;
          this.user.stateName = r.data.name;
        } else if (category === 1){
          this.user.age = r.data.value;
          this.user.ageName = r.data.name;
        } else if (category === 2){
          this.user.gender = r.data.value;
          this.user.genderName = r.data.name;
        } else if (category === 3){
          this.user.church_state = r.data.value;
          this.user.church_stateName = r.data.name;
        }

      }
    });
  }

  public async openStatePicker(isMain = true) {
    const popover = await this.popoverController.create({
      component: StatePickerComponent,
      cssClass: 'state-picker-popover',
      componentProps: {},
      translucent: true
    });
    popover.present();

    await popover.onDidDismiss().then( (r) => {
      if (r && r.data) {
        if (isMain) {
          this.user.state = r.data.value;
          this.user.stateName = r.data.name;
        } else {
          this.user.unlisted_church_state = r.data.value;
          this.user.unlisted_church_state_name = r.data.name;
        }

        this.isChangeUser();
      }
    });
  }

  public zipChange() {
    const val = this.user.zip.toString();
    if (val.length > 6) {
      setTimeout(() => {
        this.user.zip = val.slice(0, 6);
      }, 4);
    }

    this.isChangeUser();
  }

  public isChangeUser() {
    this.saveIsActive = true;
  }

  public togglePassVisible() {
    this.isVisiblePass = !this.isVisiblePass;
  }

  public clearChurchData() {
    this.user.unlisted_church_state_name = '';
    this.user.unlisted_church_state = '';
    this.user.unlisted_church_city = '';
    this.user.unlisted_church_name = '';
    this.user.church_name = '';
    this.user.church_id = null;
  }

  private fetchData() {
    this.userService.getUserData().subscribe(res => {
      console.log('res: ', res);
      this.user = res;
      this.user.stateName = this.getStateName(this.user.state);
      this.user.church_stateName = this.getStateName(this.user.church_state);
      this.user.unlisted_church_state_name = this.getStateName(this.user.unlisted_church_state);


      if (this.user.church_id) {
        this.dataService.getChurchDetail(this.user.church_id).subscribe(ch => {
          if (ch) {
            this.user.church_name = ch.name;
          }
        });
      }
    });

    this.church = { id: undefined, city: '', name: '', state: '' } as IChurch;
  }

  private getStateName(shortName: string): string {
    if (!shortName) {
      return '';
    }
    return (States.filter(s => s.value === shortName)[0] || {}).name;
  }

}
