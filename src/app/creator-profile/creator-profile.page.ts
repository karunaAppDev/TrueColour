import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { AdMobFree,AdMobFreeInterstitialConfig } from '@ionic-native/admob-free/ngx';

@Component({
  selector: 'app-creator-profile',
  templateUrl: './creator-profile.page.html',
  styleUrls: ['./creator-profile.page.scss'],
})
export class CreatorProfilePage implements OnInit {

  constructor(private mainservice: MainService,private admobFree: AdMobFree,
    private router: Router) {
      this.showInterstitialAds();
      this.mainservice.getProfileData(this.mainservice.loggedInUser).subscribe((res) => {
        this.userData.push(res);
    });

  }
  public userData = [];

  ngOnInit() {
  }
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

}
