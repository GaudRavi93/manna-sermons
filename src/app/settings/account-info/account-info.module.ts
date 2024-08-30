import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountInfoPageRoutingModule } from './account-info-routing.module';

import { AccountInfoPage } from './account-info.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    AccountInfoPageRoutingModule
  ],
  declarations: [AccountInfoPage]
})
export class AccountInfoPageModule {}
