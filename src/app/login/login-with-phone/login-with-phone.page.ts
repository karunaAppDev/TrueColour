import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';
import { LoginService } from '../login.service';
import { MainService } from 'src/app/main.service';
@Component({
  selector: 'app-login-with-phone',
  templateUrl: './login-with-phone.page.html',
  styleUrls: ['./login-with-phone.page.scss'],
})
export class LoginWithPhonePage implements OnInit {
  phone;
  constructor(public alertCtrl: AlertController, private loginservice: LoginService,public mainServ :MainService) { }
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  
  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }
  
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const phone = form.value.phone;
    this.fnPhoneAuthenticate(phone);
  }
   async fnPhoneAuthenticate(phoneNumber){
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = "+" + "91"+ phoneNumber;
    this.loginservice.loginWithPhoneNo(phoneNumberString,appVerifier);
   
  }

  waitForCaptcha(){
    this.mainServ.waitForCaptcha();
  }

}
