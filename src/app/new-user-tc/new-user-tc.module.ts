import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewUserTCPageRoutingModule } from './new-user-tc-routing.module';

import { NewUserTCPage } from './new-user-tc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewUserTCPageRoutingModule
  ],
  declarations: [NewUserTCPage]
})
export class NewUserTCPageModule {}
