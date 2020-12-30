import { Component, OnInit, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MainService } from "../main.service";
import { LoadingController, AlertController } from "@ionic/angular";
import { LoginService } from "../login/login.service";
import { AngularFireDatabase } from "@angular/fire/database";
import { Router } from '@angular/router';

@Component({
  selector: "app-comment",
  templateUrl: "./comment.page.html",
  styleUrls: ["./comment.page.scss"]
})
export class CommentPage implements OnInit {

  other;
  form: FormGroup;
  isLoading;
  userData = [];
  public commentProfileData = [];
  userCommentarray = [];
  userCommentobject = {};
  


  constructor(
    private mainservice: MainService,
    private AngFireDatabase: AngularFireDatabase,
    private loginser: LoginService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,

  ) {
    this.mainservice.getComments(this.mainservice.userid).subscribe(res => {
      this.userData.push(res);
      this.getcomments();
    });


  }

  ngOnInit() {
    this.form = new FormGroup({
      comments: new FormControl("", {
        updateOn: "change",
        validators: [Validators.compose([Validators.required])]
      })
    });
    this.mainservice.getProfileData(this.mainservice.loggedInUser).subscribe((res) => {
      let Firstname = Object.keys(res).map(Firstname => res[Firstname]);
      this.mainservice.setCommentUserName(Firstname[1] + " " + Firstname[2]);

    });

  }
  
  addComments() {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: "Adding your comments..." })
      .then(loadingEl => {
        loadingEl.present();

        this.AngFireDatabase.object(
          "userinformation/" +
          this.mainservice.userid +
          "/Comments" +
          "/" +
          this.mainservice.loggedInUser
        ).set({
          userComment: this.form.value.comments,
          userName: this.mainservice.commentUserName
        });
        loadingEl.dismiss();
      });
    this.mainservice.presentToast("Comment Added Successfully", "bottom");
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


  getcomments() {
    const commentsArray = Object.entries(this.userData[0].Comments);
    for (var i = 0; i < commentsArray.length; i++) {
      this.userCommentobject = { "profileID": commentsArray[i][0], "userName": commentsArray[i][1]['userName'], "commentvalue": commentsArray[i][1]['userComment'] };
      this.userCommentarray.push(this.userCommentobject);
    }
  }

  showProfile(value) {
    this.mainservice.setProfileID(value);
    this.router.navigate(['/show-profile']);
  }

}
