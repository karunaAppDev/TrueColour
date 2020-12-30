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
  selector: "app-want-to-tell",
  templateUrl: "./want-to-tell.page.html",
  styleUrls: ["./want-to-tell.page.scss"]
})
export class WantToTellPage implements OnInit {
  @Output() imagePick = new EventEmitter();
  selectedImage: string;
  displayAnswerField = false;
  displaySocialMediaField = false;
  EXForm = false;
  FamilyForm = false;
  ColleagueForm;
  AnonymousForm;
  FriendForm;
  showOtherFieldSeeAga = false;
  cheatedDiv = false;
  talkAboutIt = false;
  revangeDiv = false;
  SecondChanceDiv = false;
  relatedvalue;
  imageRequired=false;


  constructor(private mainservice: MainService,
    private loginserv: LoginService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }
  form: FormGroup;
  isLoading = false;
  public ionicNamedColor: string = 'primary';
 
  ngOnDestroy() {

  }
  ngOnInit() {
    this.form = new FormGroup({

      Firstname: new FormControl("", {
        updateOn: "blur",
        validators: [Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9_.-]*$')])]
      }),

      LastName: new FormControl("", {
        updateOn: "blur",
        validators: [Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[a-zA-Z0-9_.-]*$')])]
      }),

      Email: new FormControl("", {
        updateOn: "blur",
        validators: [Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])]
      }),

      PhoneNumber: new FormControl("", {
        updateOn: "blur",
        validators: [Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern('^[0-9]*$')])]
      }),
      Address: new FormControl("", {
        validators: [Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(250)])]
      }),

      image: new FormControl(null, {
      updateOn: "blur",
      }),

      SocialMedia: new FormControl("", {
        updateOn: "blur"

      }),
      SocialMediaAnswer: new FormControl("", {
        updateOn: "blur"
      }),

      Related: new FormControl("", {
        updateOn: "blur"
      }),

      Missyou: new FormControl("", {
        updateOn: "blur"
      }),

      Regret: new FormControl("", {
        updateOn: "blur"

      }),

      HeartNeedAnswer: new FormControl("", {
        updateOn: "blur"
      }),

      ExpressYourFeeling: new FormControl("", {
        validators: [Validators.compose([Validators.maxLength(400)])]

      }),

      Trustable: new FormControl("", {
        updateOn: "blur"
      }),
      Annoying: new FormControl("", {
        updateOn: "blur"
      }),
      WierdSecret: new FormControl("", {
        updateOn: "blur"
      }),
      FriendOpinion: new FormControl("", {
        updateOn: "blur"
      }),
      AnonymosOpinion: new FormControl("", {
        updateOn: "blur"
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
    'Email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Email must be valid' }
    ],
    'PhoneNumber': [
      { type: 'required', message: 'Phone Number is required.' },
      { type: 'minlength', message: 'Phone Number must be at least 10 characters long.' },
      { type: 'maxlength', message: 'Phone Number cannot be more than 13 characters long.' },
      { type: 'pattern', message: ' Phone Number must contain only numbers' },

    ],
    'Address': [
      { type: 'required', message: 'Address is required.' },
      { type: 'minlength', message: 'Address must be at least 10 characters long.' },
      { type: 'maxlength', message: 'Address cannot be more than 250 characters long.' },
    ],
    'ExpressYourFeeling': [
      { type: 'required', message: 'Express your feelings is required.' },
      { type: 'maxlength', message: 'Express your feelings cannot be more than 400 characters long.' },
    ],
    'image': [
      { type: 'required', message: 'Image is required.' },,

    ],

  }

  tellAboutThem() {

    if (this.form.get('image').value){
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Creating Profile...' })
      .then(loadingEl => {
        loadingEl.present();
        if (this.form.valid || this.form.get("image").value) {
          console.log(this.form.get('image').value);
          this.mainservice.uploadImage(this.form.get('image').value).pipe(
            switchMap(uploadRes => {
              return this.mainservice.uploadData(
                this.form.value.Firstname,
                this.form.value.LastName,
                this.form.value.Email,
                this.form.value.PhoneNumber,
                this.form.value.Address,
                this.form.value.SocialMedia,
                this.form.value.SocialMediaAnswer,
                this.form.value.Related,
                this.form.value.Missyou,
                this.form.value.Regret,
                this.form.value.HeartNeedAnswer,
                this.form.value.ExpressYourFeeling,

                this.form.value.Trustable,// This Friend Form starts
                this.form.value.Annoying,
                this.form.value.WierdSecret,
                this.form.value.FriendOpinion,
                this.form.value.AnonymosOpinion,
                uploadRes.imageUrl,
                this.mainservice.loggedInUser,
                this.mainservice.userDetailVerified,
              );
            })
          )
            .subscribe(() => {
              this.isLoading = false;
              loadingEl.dismiss();

              this.form.reset();
              this.mainservice.presentToast("Profile Created Sucessfully", "middle");
              this.router.navigate(['/want-to-know']);
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


  relatedBy(event) {

    switch (event.detail.value) {
      case "EX": {
        this.FriendForm = false;
        this.AnonymousForm = false;
        this.EXForm = true;
        break;
      }
      case "Friend": {
        this.AnonymousForm = false;
        this.EXForm = false;
        this.FriendForm = true;
        break;
      }
      case "Anonymous": {
        this.EXForm = false;
        this.FriendForm = false;
        this.AnonymousForm = true;
        break;
      }

    }

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

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: "Something Went Wrong...",
        message: message,
        buttons: ["Okay"]
      })
      .then(alertEl => alertEl.present());
  }

  showAnswer() {
    this.displayAnswerField = true;
  }

  showSocialMediaAnswer(event) {
    if (!!event.detail.value) {
      this.displaySocialMediaField = true;
    }
  }


  showOtherFieldSeeAgain(event) {
    if (event.detail.value == "Other") {
      this.showOtherFieldSeeAga = true;
    } else {
      this.showOtherFieldSeeAga = false;
    }


  }


  revangeSure(event) {
    if (event.detail.value == "Sure") {
      this.revangeDiv = true;
    } else {
      this.revangeDiv = false;
    }
  }

  



}
