import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreatorProfilePageRoutingModule } from './creator-profile-routing.module';
import { CreatorProfilePage } from './creator-profile.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatorProfilePageRoutingModule,
   
  ],
  declarations: [CreatorProfilePage]
})
export class CreatorProfilePageModule {}
