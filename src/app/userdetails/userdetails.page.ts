import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { AdMobFree,AdMobFreeInterstitialConfig } from '@ionic-native/admob-free/ngx';
import { Share } from '@capacitor/core';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.page.html',
  styleUrls: ['./userdetails.page.scss'],
})
export class UserdetailsPage implements OnInit {
 
  other;
  othervale = !!this.other;
  constructor(private mainservice: MainService,
    private admobFree: AdMobFree,
    private router: Router) {
      this.showInterstitialAds();
    this.mainservice.getData(this.mainservice.userid).subscribe((res) => {
      this.userData.push(res);
    });

  }
  public userData = [];
  
  exContent = false;
  friendContent = false;
  anonymosContent =false;
  userDetails =true;
  contentTitle = "Ex";
  showContent: boolean = false;

 


  addComments(){
    this.router.navigate(['/comment']);
  }
  setContentType(value) {

    switch (value) {

      case "EX": {
        this.exContent =true;
        this.friendContent = false;
        this.anonymosContent =false;
        this.showContent = !this.showContent;
        break;
      }
      case "Friend": {
        this.exContent =false;
        this.friendContent = true;
        this.anonymosContent =false;
        this.showContent = !this.showContent;
        break;
      }
      case "Anonymous": {
        this.exContent =false;
        this.friendContent = false;
        this.anonymosContent =true;
        this.showContent = !this.showContent;
        break;
      }

    }

  }
 
  ngOnInit() {

  }
  ngOnDestroy(){}

  showInterstitialAds(){
      const interstitialConfig : AdMobFreeInterstitialConfig ={
        autoShow : true,
        id :'ca-app-pub-4663109527121211/9301996210',
        isTesting : false
      };
      this.admobFree.interstitial.config(interstitialConfig)
      this.admobFree.interstitial.prepare().then(()=>{
      }).catch(err=>alert(err))
  }


  wanttoKnow() {
    this.mainservice.wanttoKnow();
  }

  wanttoTell() {
    this.mainservice.wanttoTell();
  }

  showProfile(value) {
    this.mainservice.setProfileID(value);
    this.router.navigate(['/show-profile']); 
  }


  async share(){
    await Share.share({
      title :'Someone said about you in True Colour App',
      text:'Testing the Text',
      url:'https://play.google.com/store/apps/details?id=com.truecolour.sms'
    })
  }
}