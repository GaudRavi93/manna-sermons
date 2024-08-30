import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisconnectPageRoutingModule } from './disconnect-routing.module';

import { DisconnectPage } from './disconnect.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisconnectPageRoutingModule
  ],
  declarations: [DisconnectPage]
})
export class DisconnectPageModule {}
