import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { EventService } from '../shared/services/event.service';
import { Subscription } from 'rxjs';
import { IonContent, PopoverController } from '@ionic/angular';
import { StatePickerComponent } from '../shared/components/state-picker/state-picker.component';
import { UserService } from '../shared/services/user.service';
import { IUser } from '../shared/models/user';
// import { PayService } from '../shared/services/pay.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit, OnDestroy {
  public currentTab = 0;
  public regForm: FormGroup;
  // public isShowCustomChurch = false;
  // public notAff = false;
  public isChurchEmpty = true;
  private subscriberList: Subscription[] = [];
  // private isBackFromChurchPicker = false;
  @ViewChild(IonContent, {read: IonContent, static: false}) myContent: IonContent;

  constructor(
    private router: Router,
    private dataService: DataService,
    private userService: UserService,
    private eventService: EventService,
    // private pay: PayService,
    public popoverController: PopoverController,
  ) { }

  ngOnInit() {
    this.formInit();
    // this.subscriberList.push(this.eventService.newChurch.asObservable().subscribe(res => {
    //   this.regForm.controls.church.patchValue(res.name);
    //   this.regForm.controls.church_id.patchValue(res.id);
    //   this.isBackFromChurchPicker = true;
    // }));
  }
  public isEmpty(){

    this.isChurchEmpty = this.regForm.controls.church_name.value === '';
    if (this.isChurchEmpty === false){
      this.regForm.controls.pastor_name.setValidators([Validators.required]);

      this.regForm.controls.church_city.setValidators([Validators.required]);
      this.regForm.controls.church_state.setValidators([Validators.required]);
    }else{
      this.regForm.controls.pastor_name.clearValidators();
      this.regForm.controls.church_city.clearValidators();
      this.regForm.controls.church_state.clearValidators();
    }
    this.regForm.controls.pastor_name.updateValueAndValidity();
    this.regForm.controls.church_city.updateValueAndValidity();
    this.regForm.controls.church_state.updateValueAndValidity();
  }
  ionViewDidEnter() {
    // if (!this.isBackFromChurchPicker) {
    //   this.formInit();
    // } else {
    //   setTimeout(() => {
    //     this.myContent.scrollToBottom(300);
    //   }, 300);
    // }
    // this.isBackFromChurchPicker = false;
  }

  ngOnDestroy() {
    this.subscriberList.forEach(s => s.unsubscribe());
    this.subscriberList = [];
  }

  public changeTab(val: number) {
    this.currentTab = val;
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
        if (category === 0) {
          this.regForm.controls.state.patchValue(r.data.value);
          this.regForm.controls.state_name.patchValue(r.data.name);
        } else if (category === 1){
          this.regForm.controls.age.patchValue(r.data.value);
          this.regForm.controls.age_name.patchValue(r.data.name);
        } else if (category === 2){
          this.regForm.controls.gender.patchValue(r.data.value);
          this.regForm.controls.gender_name.patchValue(r.data.name);
        } else if (category === 3){
          this.regForm.controls.church_state.patchValue(r.data.name);
          this.regForm.controls.church_state_name.patchValue(r.data.value);
        }

      }
    });
  }

  public clearChurchData() {
    this.regForm.controls.church.patchValue('');
    // this.regForm.controls.unlisted_church_name.patchValue('');
    // this.regForm.controls.unlisted_church_city.patchValue('');
    // this.regForm.controls.unlisted_church_state_name.patchValue('');
  }

  public get f() {
    return this.regForm.controls;
  }

  public isValid(): boolean {
    // const data = this.regForm.value;
    
    // return !this.regForm.invalid &&
    //   (this.notAff || data.church || (data.unlisted_church_name && data.unlisted_church_city && data.unlisted_church_state));
    return !this.regForm.invalid;
  }

  // public gotoChurchPicker() {
  //   this.router.navigate(['churches']);
  // }

  public makePay() {
    // this.pay.makePay();
  }

  public register(e) {
    this.getFormValidationErrors();

    if (!this.isValid()) {
      return;
    }

    const user: IUser = this.regForm.value;
    this.userService.updateUserData(user).subscribe((r) => {

      // if (this.pay.isOk())
        this.router.navigate(['home']);
      // else
      //   this.router.navigate(['subscribe']);
    });
  }

  private getFormValidationErrors() {
    Object.keys(this.regForm.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.regForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  private formInit() {
    this.regForm = new FormGroup({
      family_name: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      given_name: new FormControl('', [
        Validators.required,
      ]),
//      country: new FormControl('', [
//        Validators.required,
//      ]),
      city: new FormControl(''),
      state: new FormControl(''),
      state_name: new FormControl(''),
      zip: new FormControl('', [
        Validators.required, Validators.maxLength(6)
      ]),
      church_name: new FormControl(''),
      church_id: new FormControl(''),
      age: new FormControl(''),
      gender: new FormControl(''),
      age_name: new FormControl(''),
      gender_name: new FormControl(''),
      pastor_name: new FormControl(''),
//      church_country: new FormControl('', [
//        Validators.required
//      ]),
      church_city: new FormControl(''),
      church_state: new FormControl(''),
      church_state_name: new FormControl('')
    });

    /*this.regForm.addControl('church', new FormControl(
      '',
      {
        validators: [churchValidator(this.regForm, this.notAff)],
        updateOn: 'submit'
      })
    );*/

  }
}
