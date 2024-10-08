import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpCenterPageRoutingModule } from './help-center-routing.module';

import { HelpCenterPage } from './help-center.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    HelpCenterPageRoutingModule
  ],
  declarations: [HelpCenterPage]
})
export class HelpCenterPageModule {}
