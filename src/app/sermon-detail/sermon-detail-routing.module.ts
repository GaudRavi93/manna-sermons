import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SermonDetailPage } from './sermon-detail.page';

const routes: Routes = [
  {
    path: ':id',
    component: SermonDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SermonDetailPageRoutingModule {}
