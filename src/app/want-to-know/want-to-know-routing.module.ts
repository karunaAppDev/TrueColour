import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WantToKnowPage } from './want-to-know.page';

const routes: Routes = [
  {
    path: '',
    component: WantToKnowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WantToKnowPageRoutingModule {}
