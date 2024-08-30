import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SermonsPage } from './sermons.page';

const routes: Routes = [
  {
    path: '',
    component: SermonsPage
  },
  {
    path: ':id',
    component: SermonsPage
  },
  {
    path: ':id/:name',
    component: SermonsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SermonsPageRoutingModule {}
