import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChurchesPageRoutingModule } from './churches-routing.module';

import { ChurchesPage } from './churches.page';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ChurchesPageRoutingModule
  ],
  declarations: [ChurchesPage]
})
export class ChurchesPageModule {}
