import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SermonsPageRoutingModule } from './sermons-routing.module';

import { SermonsPage } from './sermons.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SermonsPageRoutingModule
  ],
  declarations: [SermonsPage]
})
export class SermonsPageModule {}
