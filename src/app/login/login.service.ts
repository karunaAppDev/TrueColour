import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoadingController, AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../user.model';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Router } from "@angular/router";
import { MainService } from '../main.service';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registred?: boolean;
 
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  phoneNumber ;
  email;
  private _user = new BehaviorSubject<User>(null);
  loggedInUser;
  isLoading = false;
  

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get userId() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      })
    );
  }
  constructor(private http: HttpClient, private loadingCtrl: LoadingController,public alertCtrl: AlertController, private router: Router,
    private googlePlus: GooglePlus, private firebaseAuthentication: FirebaseAuthentication, private fireAuth: AngularFireAuth,public mainServ : MainService) { }


  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
        environment.firebaseApiKey
        }`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(tap(this.setUserData.bind(this)));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
        environment.firebaseApiKey
        }`,
        { email: email, password: password }
      )
      .pipe(tap(this.setUserData.bind(this)));
  }

  loginWithGoogle() {
    this.googlePlus.login({}).then((result: any) => {
      const { idToken, accessToken } = result
      this.onGoogleLoginSuccess(idToken ? idToken : null, accessToken);
      
    }).catch((err) => {
      alert(err);
    });
  }

  onGoogleLoginSuccess(accessToken, accessSecret) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {
        loadingEl.present();
    const credential = accessSecret ? firebase.auth.GoogleAuthProvider
      .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
        .credential(accessToken);
    this.fireAuth.signInWithCredential(credential)
      .then((response) => {
        this.mainServ.setEmailId(response.user.email);
        this.mainServ.checkLoggedInUser().subscribe((res) => {
        });;

      this.isLoading = false;
      loadingEl.dismiss();
      
      })
      
    });
      
  }

  loginWithPhoneNo(phoneNumberString,appVerifier ){
    
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
    .then( async (confirmationResult) =>  {
      
      let prompt = await this.alertCtrl.create({
      message: 'Enter the Confirmation code',
      inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
      buttons: [
        { text: 'Cancel',
          handler: data => { 

           }
        },
        
        { text: 'Send',
          handler: data => {
            confirmationResult.confirm(data.confirmationCode)
              .then( (result) => {
                this.mainServ.setPhoneNumber(result.user.phoneNumber);
                this.router.navigate(["/new-user-policy"]);
              }).catch( (error) => {
                
              });
          }
        }
        
      ]
    })
    prompt.present();
  })
  .catch(function (error) {
    console.error("SMS not sent", error);
  });
  
  }

  private setUserData(userData: AuthResponseData) {
    const expirationTime = new Date(
      new Date().getTime() + +userData.expiresIn * 1000
    );
    this._user.next(
      new User(
        userData.localId,
        userData.email,
        userData.idToken,
        expirationTime
      )

    );
    this.loggedInUser = userData.localId;
  }

  logout() {
    this._user.next(null);
  }
}
  






