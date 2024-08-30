import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChurchDetailPage } from './church-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ChurchDetailPage
  },
  {
    path: ':id',
    component: ChurchDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChurchDetailPageRoutingModule {}
