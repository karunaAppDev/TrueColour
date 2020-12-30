import { Component, OnInit, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MainService } from "../main.service";
import { LoadingController, AlertController } from "@ionic/angular";
import { LoginService } from "../login/login.service";
import { AngularFireDatabase } from "@angular/fire/database";
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  other;
  form: FormGroup;
  isLoading;
  userData = [];
  public feedbackProfileData = [];
  userFeedbackarray = [];
  userFeedbackobject = {};
  

  constructor(private mainservice: MainService,
    private AngFireDatabase: AngularFireDatabase,
    private loginser: LoginService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,) {
      
     }

  ngOnInit() {
    this.form = new FormGroup({
      feedback: new FormControl("", {
        updateOn: "change",
        validators: [Validators.compose([Validators.required])]
      })
    });
    this.mainservice.getProfileData(this.mainservice.loggedInUser).subscribe((res) => {
      let Firstname = Object.keys(res).map(Firstname => res[Firstname]);
      this.mainservice.setFeedbackUserName(Firstname[1] + " " + Firstname[2]);

    });
  }

  addFeedback() {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: "Adding your feedback..." })
      .then(loadingEl => {
        loadingEl.present();

        this.AngFireDatabase.object(
          "Feedback/" +
          this.mainservice.loggedInUser 
          
        ).set({
          UserFeedback: this.form.value.feedback,
          UserName: this.mainservice.feedbackUserName
        });
        loadingEl.dismiss();
      });
    this.mainservice.presentToast("Thanks for your Feedback ", "middle");
    window.history.back();
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
