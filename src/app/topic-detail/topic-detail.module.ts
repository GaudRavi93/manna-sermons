import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopicDetailPageRoutingModule } from './topic-detail-routing.module';

import { TopicDetailPage } from './topic-detail.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    TopicDetailPageRoutingModule
  ],
  declarations: [TopicDetailPage]
})
export class TopicDetailPageModule {}
