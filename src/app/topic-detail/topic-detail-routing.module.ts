import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopicDetailPage } from './topic-detail.page';

const routes: Routes = [
  {
    path: ':id',
    component: TopicDetailPage
  },
  {
    path: ':id/:id2',
    component: TopicDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicDetailPageRoutingModule {}
