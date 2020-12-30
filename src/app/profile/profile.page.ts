import { Component, OnInit, Output } from "@angular/core";
import { EventEmitter } from "events";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MainService } from "../main.service";
import { switchMap } from "rxjs/operators";
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { LoginService } from '../login/login.service';

function base64toBlob(base64Data, contentType) {
  contentType = contentType || "";
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);


  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @Output() imagePick = new EventEmitter();
  selectedImage: string;
  displayAnswerField = false;
  displaySocialMediaField = false;
  EXForm = false;
  AnonymousForm;
  showOtherFieldSeeAga = false;
  cheatedDiv = false;
  talkAboutIt = false;
  revangeDiv = false;
  SecondChanceDiv = false;
  relatedvalue;
  email;
  phoneNumber;
  
  
  

  constructor(private mainservice: MainService,
    private loginserv: LoginService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { 
      this.email =this.mainservice.email;
      this.phoneNumber =this.mainservice.phoneNumber;
    }

  form: FormGroup;
  isLoading = false;
  public ionicNamedColor: string = 'primary';
  ngOnDestroy() {
  }

    ngOnInit() {

      this.form = new FormGroup({

        Firstname: new FormControl("", {
          updateOn: "blur",
          validators: [Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(15),Validators.pattern('^[a-zA-Z0-9_.-]*$')])]
        }),
  
        LastName: new FormControl("", {
          updateOn: "blur",
          validators: [Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(15),Validators.pattern('^[a-zA-Z0-9_.-]*$')])]
        }),
        
        Email: new FormControl("", {
          updateOn: "blur",
         }),
        
          PhoneNumber: new FormControl("", {
          updateOn: "blur",
         }),
        Address: new FormControl("", {
          validators: [Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(250)])]
        }),
        image: new FormControl(null, {
          updateOn: "blur",
  
        })
      })

  }

  validation_messages = {
    'FirstName': [
        { type: 'required', message: 'First Name is required.' },
        { type: 'minlength', message: 'First Name must be at least 3 characters long.' },
        { type: 'maxlength', message: 'First Name cannot be more than 15 characters long.' },
        { type: 'pattern', message: ' First Name must contain only numbers and letters.' }
      
      ],
      'LastName': [
        { type: 'required', message: 'Last Name is required.' },
        { type: 'minlength', message: 'Last Name must be at least 3 characters long.' },
        { type: 'maxlength', message: 'Last Name cannot be more than 25 characters long.' },
        { type: 'pattern', message: ' Last Name must contain only numbers and letters.' }
        
      ],
      
      'Address': [
        { type: 'required', message: 'Address is required.' },
        { type: 'minlength', message: 'Address must be at least 10 characters long.' },
        { type: 'maxlength', message: 'Address cannot be more than 250 characters long.' },
      ],
    }

    onImagePicked(imageData: string | File) {
      let imageFile;
      if (typeof imageData === "string") {
        try {
          imageFile = base64toBlob(
            imageData.replace('data:image/jpeg;base64,', ''),
            "image/jpeg"
          );
        } catch (error) {
          return;
        }
      } else {
        imageFile = ImageData;
      }
      this.form.patchValue({ image: imageFile });
    }

    createProfile() {
      if (this.form.get('image').value){
      this.isLoading = true;
      this.loadingCtrl
        .create({ keyboardClose: true, message: 'Creating Profile...' })
        .then(loadingEl => {
          loadingEl.present();
          if (this.form.valid || this.form.get("image").value) {
            this.mainservice.uploadImage(this.form.get('image').value).pipe(
              switchMap(uploadRes => {
                return this.mainservice.uploadProfile(
                  this.form.value.Firstname,
                  this.form.value.LastName,
                  this.form.value.Email,
                  this.form.value.PhoneNumber,
                  this.form.value.Address,
                  uploadRes.imageUrl,  
                  
                );
              })
            )
              .subscribe((res) => {
                let values = Object.keys(res).map(name => res[name]);
                this.mainservice.setLoggedInUser(values[0]);
                this.isLoading = false;
                loadingEl.dismiss();
                this.form.reset();
                this.mainservice.presentToast("Profile Created Sucessfully","middle");
                this.router.navigate(['/home']);
              }, errRes => {
                loadingEl.dismiss();
                let message = 'Please Create Profile Again!';
                this.showAlert(message);
              }
  
              );
          }
        });
      }
      else{
        this.mainservice.presentToast("Image is Mandatory", "middle");
      }
    }

    private showAlert(message: string) {
      this.alertCtrl
        .create({
          header: "Something Went Wrong...",
          message: message,
          buttons: ["Okay"]
        })
        .then(alertEl => alertEl.present());
    }
}
