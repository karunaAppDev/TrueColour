import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WantToTellPage } from './want-to-tell.page';

const routes: Routes = [
  {
    path: '',
    component: WantToTellPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WantToTellPageRoutingModule {}
