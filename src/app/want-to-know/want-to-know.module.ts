import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WantToKnowPageRoutingModule } from './want-to-know-routing.module';
import { WantToKnowPage } from './want-to-know.page';
import { SharedModule } from '../shared/shared.module';
import { SearchPipe } from '../search.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WantToKnowPageRoutingModule,
    SharedModule
  ],
  declarations: [WantToKnowPage,SearchPipe]
})
export class WantToKnowPageModule {}


