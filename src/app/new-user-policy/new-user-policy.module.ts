import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewUserPolicyPageRoutingModule } from './new-user-policy-routing.module';

import { NewUserPolicyPage } from './new-user-policy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewUserPolicyPageRoutingModule
  ],
  declarations: [NewUserPolicyPage]
})
export class NewUserPolicyPageModule {}
