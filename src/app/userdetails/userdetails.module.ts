import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserdetailsPageRoutingModule } from './userdetails-routing.module';
import { UserdetailsPage } from './userdetails.page';
import { EncodedPhoneNumberPipe } from '../encoded-phone-number.pipe';
import { EncodedEmailPipe } from '../encoded-email.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserdetailsPageRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [UserdetailsPage,EncodedPhoneNumberPipe,EncodedEmailPipe]
})
export class UserdetailsPageModule {}
