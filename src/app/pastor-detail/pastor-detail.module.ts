import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PastorDetailPageRoutingModule } from './pastor-detail-routing.module';

import { PastorDetailPage } from './pastor-detail.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PastorDetailPageRoutingModule
  ],
  declarations: [PastorDetailPage]
})
export class PastorDetailPageModule {}
