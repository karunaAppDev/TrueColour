import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { userData } from "./userinfo/userinfo.module";
import { userProfile } from "./userinfo/userProfile.module";
import { map, tap } from "rxjs/operators";
import { BehaviorSubject, of } from "rxjs";
import { Router } from '@angular/router';
import { ToastController, AlertController } from "@ionic/angular";


interface userDataa {

  id: string;
  Firstname: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  Address: string;
  SocialMedia: string;
  SocialMediaAnswer: string;
  Related: string;
  Missyou: string;
  Regret: string;
  HeartNeedAnswer: string;
  ExpressYourFeeling: string;
  Trustable: string;
  Annoying: string;
  WierdSecret: string;
  FriendOpinion: string;
  AnonymosOpinion: string;
  imageUrl: string;
  profileCreaterId: string;
  userDetailVerified: boolean;
}

interface profiledata {
  id: string;
  Firstname: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  Address: string;
  imageUrl: string;
}

@Injectable({
  providedIn: "root"
})
export class MainService {
  private _userDetails = new BehaviorSubject<userData[]>([]);
  constructor(private http: HttpClient, private alertCtrl: AlertController, private router: Router, public toastController: ToastController, ) { }

  userid;
  phoneNumber;
  email;
  loggedInUser;
  userDetailVerified = false;
  commentUserName;
  feedbackUserName;
  profileID;
  userProfileArray = [];
  setLoggedInUserFlag;

  get userDetailsarray() {
    return this._userDetails.asObservable();
  }

  uploadData(
    Firstname: string,
    LastName: string,
    Email: string,
    PhoneNumber: string,
    Address: string,
    SocialMedia: string,
    SocialMediaAnswer: string,
    Related: string,
    Missyou: string,
    Regret: string,
    HeartNeedAnswer: string,
    ExpressYourFeeling: string,
    Trustable: string,
    Annoying: string,
    WierdSecret: string,
    FriendOpinion: string,
    AnonymosOpinion: string,
    imageUrl: string,
    profileCreaterId: string,
    userDetailVerified: boolean,

  ) {
    const userdetails = new userData(
      Math.random().toString(),
      Firstname,
      LastName,
      Email,
      PhoneNumber,
      Address,
      SocialMedia,
      SocialMediaAnswer,
      Related,
      Missyou,
      Regret,
      HeartNeedAnswer,
      ExpressYourFeeling,
      Trustable,
      Annoying,
      WierdSecret,
      FriendOpinion,
      AnonymosOpinion,
      imageUrl,
      profileCreaterId,
      userDetailVerified
    );
    return this.http.post(
      "https://mobileapp-5fcd7.firebaseio.com/userinformation.json",
      { ...userdetails, id: null }
    );
  }

  uploadImage(image: File) {
    const uploadData = new FormData();
    uploadData.append("image", image);
    return this.http.post<{ imageUrl: string; imagepath: string }>(
      'https://us-central1-mobileapp-5fcd7.cloudfunctions.net/storeImage',
      uploadData
    );
  }

  getData(id: string) {
    return this.http
      .get<userDataa>(
        `https://mobileapp-5fcd7.firebaseio.com/userinformation/${id}.json`
      )
      .pipe(
        map(userDataa => {
          return new userData(
            id,
            userDataa.Firstname,
            userDataa.LastName,
            userDataa.Email,
            userDataa.PhoneNumber,
            userDataa.Address,
            userDataa.SocialMedia,
            userDataa.SocialMediaAnswer,
            userDataa.Related,
            userDataa.Missyou,
            userDataa.Regret,
            userDataa.HeartNeedAnswer,
            userDataa.ExpressYourFeeling,
            userDataa.Trustable,
            userDataa.Annoying,
            userDataa.WierdSecret,
            userDataa.FriendOpinion,
            userDataa.AnonymosOpinion,
            userDataa.imageUrl,
            userDataa.profileCreaterId,
            userDataa.userDetailVerified,


          );
        })
      );
  }

  getProfileData(id: string) {
    return this.http
      .get<profiledata>(
        `https://mobileapp-5fcd7.firebaseio.com/Profile/${id}.json`

      )
      .pipe(
        map(profiledata => {
          return new userProfile(
            id,
            profiledata.Firstname,
            profiledata.LastName,
            profiledata.Email,
            profiledata.PhoneNumber,
            profiledata.Address,
            profiledata.imageUrl,

          );
        })
      );
  }

  getALLData() {
    return this.http
      .get<{ [key: string]: userDataa }>(
        `https://mobileapp-5fcd7.firebaseio.com/userinformation.json`
      )
      .pipe(
        map(userdetails => {
          const userInfo = [];
          for (const key in userdetails) {
            if (userdetails.hasOwnProperty(key)) {
              userInfo.push(
                new userData(
                  key,
                  userdetails[key].Firstname,
                  userdetails[key].LastName,
                  userdetails[key].Email,
                  userdetails[key].PhoneNumber,
                  userdetails[key].Address,
                  userdetails[key].SocialMedia,
                  userdetails[key].SocialMediaAnswer,
                  userdetails[key].Related,
                  userdetails[key].Missyou,
                  userdetails[key].Regret,
                  userdetails[key].HeartNeedAnswer,
                  userdetails[key].ExpressYourFeeling,
                  userdetails[key].Trustable,
                  userdetails[key].Annoying,
                  userdetails[key].WierdSecret,
                  userdetails[key].FriendOpinion,
                  userdetails[key].AnonymosOpinion,
                  userdetails[key].imageUrl,
                  userdetails[key].profileCreaterId,
                  userdetails[key].userDetailVerified,
                )
              );
            }
          }
          return userInfo;
        }),
        tap(userInfo => {
          this._userDetails.next(userInfo);
        })
      );
  }

  setUserId(id) {
    return this.userid = id;
  }

  setEmailId(value) {
    return this.email = value;
  }

  setPhoneNumber(value) {
    return this.phoneNumber = value;
  }

  setLoggedInUser(value) {
    return this.loggedInUser = value;
  }

  setCommentUserName(value) {
    return this.commentUserName = value;
  }

  setFeedbackUserName(value) {
    return this.feedbackUserName = value;
  }

  setProfileID(value) {
    return this.profileID = value;
  }

  wanttoKnow() {
    this.router.navigate(['/want-to-know']);
  }


  home() {
    this.router.navigate(['/home']);
  }

  wanttoTell() {
    this.understandAlert();
    this.router.navigate(['/want-to-tell']);
  }

  async presentToast(message, position) {
    const toast = await this.toastController.create({
      message: "                     " + message,
      position: position,
      duration: 2000,
      color: "primary",
      animated: true,
    });
    toast.present();
  }



  getComments(id: string) {
    return this.http
      .get<userDataa>(
        `https://mobileapp-5fcd7.firebaseio.com/userinformation/${id}.json`
      )
  }

  uploadProfile(
    Firstname: string,
    LastName: string,
    Email: string,
    PhoneNumber: string,
    Address: string,
    imageUrl: string,
  ) {
    const userdetails = new userProfile(
      Math.random().toString(),
      Firstname,
      LastName,
      Email,
      PhoneNumber,
      Address,
      imageUrl,

    );
    return this.http.post(
      "https://mobileapp-5fcd7.firebaseio.com/Profile.json",
      { ...userdetails, id: null }
    );
  }


  getAllProfileData() {
    return this.http
      .get<profiledata>(
        `https://mobileapp-5fcd7.firebaseio.com/Profile.json`
      )
      .pipe(
        map(profiledata => {
          return new userProfile(
            Math.random().toString(),
            profiledata.Firstname,
            profiledata.LastName,
            profiledata.Email,
            profiledata.PhoneNumber,
            profiledata.Address,
            profiledata.imageUrl
          );
        })
      );
  }

  private understandAlert() {
    this.alertCtrl
      .create({
        header: "Before you continue...",
        message: "Once submitted, the post cannot be edited or deleted. You acknowledge that your User Content are public and you are posting at your own risk and that the Company cannot guarantee the security of the information you disclose. Company reserves the right to completely validate for contents before publishing for the first time and also restrict or remove your content for any reason at any time ,in Company's sole discretion and without notice to you.",
        buttons: ["I Agree"]
      })
      .then(alertEl => alertEl.present());
  }

  private existingUser() {
    this.alertCtrl
      .create({
        header: "Existing User",
        message: "",
        buttons: ["I Agree"]
      })
      .then(alertEl => alertEl.present());
  }

  private newUser() {
    this.alertCtrl
      .create({
        header: "New User",
        message: "",
        buttons: ["I Agree"]
      })
      .then(alertEl => alertEl.present());
  }

  checkLoggedInUser() {
    return this.http
      .get<{ [key: string]: profiledata }>(
        `https://mobileapp-5fcd7.firebaseio.com/Profile.json`
      )
      .pipe(
        map(profiledata => {
          const userInfo = [];
          for (const key in profiledata) {
            if (profiledata.hasOwnProperty(key)) {
              userInfo.push(
                new userProfile(
                  key,
                  profiledata[key].Firstname,
                  profiledata[key].LastName,
                  profiledata[key].Email,
                  profiledata[key].PhoneNumber,
                  profiledata[key].Address,
                  profiledata[key].imageUrl,
                )
              );
            }
          }

          for (var i = 0; i < userInfo.length; i++) {

            if (userInfo[i].Email.trim() === this.email.trim()) {
              this.setLoggedInUser(userInfo[i].id);
              this.router.navigate(["/home"]);
              break;
            } else {
              this.router.navigate(["/login-with-phone"]);
            }

          }
          return userInfo;
        }),

      );
  }

  waitForCaptcha(){
  this.alertCtrl
      .create({
        header: "Processing for Captcha & OTP.",
        message: "",
        buttons: ["OK"]
      })
      .then(alertEl => alertEl.present());

    }


    profileNonEditable(){
      this.alertCtrl
          .create({
            header: "",
            message: "Profile cannot be edited or deleted once created.",
            buttons: ["I Agree"]
          })
          .then(alertEl => alertEl.present());
    
        }
}
