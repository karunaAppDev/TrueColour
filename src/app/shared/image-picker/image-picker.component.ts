import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef,Input } from '@angular/core';
import { Plugins, Capacitor, CameraSource, CameraResultType } from '@capacitor/core';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @ViewChild('filePicker') filePick: ElementRef<HTMLInputElement>;
  @Output() imagePick = new EventEmitter<string | File>();
  selectedImage: string;
  userPicker = false;
  @Input() showPreview = false;

  constructor(private platfrom: Platform) { }

  ngOnInit() {

    if ((this.platfrom.is('mobile') && !this.platfrom.is('hybrid')) || this.platfrom.is('desktop')) {
      this.userPicker = true;
    }
  }

 
  onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      this.filePick.nativeElement.click();
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 100,
      source: CameraSource.Prompt,
      correctOrientation: true,
      width: 600,
      resultType: CameraResultType.Base64
    })
      .then(image => {
        this.selectedImage = 'data:image/jpeg;base64,' + image.base64String;
        this.imagePick.emit(image.base64String);
      })
      .catch(error => {
        if(this.userPicker){
        this.filePick.nativeElement.click();
        }
        return false;
      });
  }

  onFileChosen(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if (!pickedFile) {
      return;
    }
    const fr = new FileReader();
    fr.onload =()=>{
      const dataUrl =fr.result.toString();
      this.selectedImage =dataUrl;
      this.imagePick.emit(pickedFile);
    }
    fr.readAsDataURL(pickedFile);
  }

}
