import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginWithPhonePage } from './login-with-phone.page';

const routes: Routes = [
  {
    path: '',
    component: LoginWithPhonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginWithPhonePageRoutingModule {}
