import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PastorDetailPage } from './pastor-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PastorDetailPage
  },
  {
    path: ':id',
    component: PastorDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PastorDetailPageRoutingModule {}
