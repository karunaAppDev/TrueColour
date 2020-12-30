import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { LoginService, AuthResponseData } from "./login.service";
import { LoadingController, AlertController, NavController  } from "@ionic/angular";
import { Observable } from 'rxjs';
import { MainService } from '../main.service';
import * as firebase from 'firebase';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  constructor(
    private router: Router,
    private loginservice: LoginService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private mainSer: MainService,
    public navCtrl:NavController,

  ) { 
    
   }
  isLoading = false;
  isLogin = true;
  username;
  password;
  darkMode :boolean =true;
  phoneNumber;
  

  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }

  ngOnInit() { }
  
  login(formValue) {
    this.router.navigate(["/home"]);
  }

  authenticate(email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        if (this.isLogin) {
          authObs = this.loginservice.login(email, password);
        } else {
          authObs = this.loginservice.signup(email, password);
        }
        authObs.subscribe(
          resData => {

            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl('/home');
            this.mainSer.presentToast("Logged In Sucessfully", "top");
          },
          errRes => {
            loadingEl.dismiss();
            const code = errRes.error.error.message;
            let message = 'Could not sign you up, please try again.';
            if (code === 'EMAIL_EXISTS') {
              message = 'This email address exists already!';
            } else if (code === 'EMAIL_NOT_FOUND') {
              message = 'E-Mail address could not be found.';
            } else if (code === 'INVALID_PASSWORD') {
              message = 'This password is not correct.';
            }
            this.showAlert(message);
          }
        );
      });
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.username;
    const password = form.value.password;
    this.authenticate(email, password);
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: "Authentication failed",
        message: message,
        buttons: ["Okay"]
      })
      .then(alertEl => alertEl.present());
  }

  fnLoginWithGoogle(){
       this.loginservice.loginWithGoogle();
      
  }


}
