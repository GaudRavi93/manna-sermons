import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PastorsPage } from './pastors.page';

const routes: Routes = [
  {
    path: '',
    component: PastorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PastorsPageRoutingModule {}
