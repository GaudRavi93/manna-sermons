import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChurchesPage } from './churches.page';

const routes: Routes = [
  {
    path: '',
    component: ChurchesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChurchesPageRoutingModule {}
