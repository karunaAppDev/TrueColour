import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewUserPolicyPage } from './new-user-policy.page';

const routes: Routes = [
  {
    path: '',
    component: NewUserPolicyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewUserPolicyPageRoutingModule {}
