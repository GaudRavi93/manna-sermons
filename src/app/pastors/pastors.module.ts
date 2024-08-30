import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PastorsPageRoutingModule } from './pastors-routing.module';

import { PastorsPage } from './pastors.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PastorsPageRoutingModule
  ],
  declarations: [PastorsPage]
})
export class PastorsPageModule {}
