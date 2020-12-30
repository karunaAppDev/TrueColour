import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShowProfilePageRoutingModule } from './show-profile-routing.module';
import { ShowProfilePage } from './show-profile.page';
import { EncodedPhoneNumberPipe } from '../encoded-phone-number.pipe';
import { EncodedEmailPipe } from '../encoded-email.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowProfilePageRoutingModule
  ],
  declarations: [ShowProfilePage,EncodedPhoneNumberPipe,EncodedEmailPipe]
})
export class ShowProfilePageModule {}
