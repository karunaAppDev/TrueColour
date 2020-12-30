import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';
import { EncodedPhoneNumberPipe } from './encoded-phone-number.pipe';
import { EncodedEmailPipe } from './encoded-email.pipe';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AdMobFree } from '@ionic-native/admob-free/ngx';

firebase.initializeApp(environment.firebaseConfig);



@NgModule({
  declarations: [AppComponent, EncodedPhoneNumberPipe, EncodedEmailPipe ],
  entryComponents: [],
  imports: [BrowserModule,HttpClientModule,FormsModule,ReactiveFormsModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(environment.firebaseConfig), AngularFireStorageModule],
  exports:[],
  providers: [
    StatusBar,
    SplashScreen,GooglePlus,FirebaseAuthentication,AdMobFree,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
