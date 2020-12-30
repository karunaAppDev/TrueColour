import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewUserTCPage } from './new-user-tc.page';

const routes: Routes = [
  {
    path: '',
    component: NewUserTCPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewUserTCPageRoutingModule {}
