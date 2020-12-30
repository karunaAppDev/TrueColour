import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ImagePickerComponent } from './image-picker/image-picker.component';

@NgModule({
  declarations: [
    
    ImagePickerComponent
  ],
  imports: [CommonModule, IonicModule],
  exports: [ ImagePickerComponent],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}