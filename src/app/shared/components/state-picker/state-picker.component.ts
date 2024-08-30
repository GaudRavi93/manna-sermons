import { Component, Input, OnInit } from '@angular/core';
import { States, Ages, Gender } from '../../../constants';
import { IState } from '../../models/register';
import { PopoverController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
@Component({
  selector: 'app-state-picker',
  templateUrl: './state-picker.component.html',
  styleUrls: ['./state-picker.component.scss'],
})
export class StatePickerComponent implements OnInit {

  public states = States as IState[];
  public title = '';
  constructor(
    private popoverCtrl: PopoverController,
    public navParamas: NavParams
  ) {

    const category = navParamas.get('pickerCategory');
    this.states = this.initializeState(category);
    this.title = this.initializeTitle(category);
  }
  ngOnInit(): void {
  }

  public async close(val: IState) {
    await this.popoverCtrl.dismiss(val);
  }

  private initializeTitle(category){
    if (category === 0 || category === 3)
      {return 'States';}
    else if (category === 1)
      {return 'Age';}
    else if (category === 2)
      {return 'Gender';}
  }
  private initializeState(category){
    // console.log(this.pickerCategory);

    if (category === 0 || category === 3){
      return States as IState[];
    }else if (category === 1){
      return Ages as IState[];
    }else if (category === 2){
      return Gender as IState[];
    }

  }


}
