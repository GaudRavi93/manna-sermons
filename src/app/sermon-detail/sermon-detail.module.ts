import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SermonDetailPageRoutingModule } from './sermon-detail-routing.module';

import { SermonDetailPage } from './sermon-detail.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SermonDetailPageRoutingModule
  ],
  declarations: [SermonDetailPage]
})
export class SermonDetailPageModule {}
