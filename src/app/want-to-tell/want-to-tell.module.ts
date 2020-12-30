import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WantToTellPageRoutingModule } from './want-to-tell-routing.module';
import { WantToTellPage } from './want-to-tell.page';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FormsModule,
    WantToTellPageRoutingModule,
    SharedModule,
  ],
  declarations: [WantToTellPage]
})
export class WantToTellPageModule {
  
}
