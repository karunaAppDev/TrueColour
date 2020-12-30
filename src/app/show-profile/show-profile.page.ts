import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { AdMobFree,AdMobFreeInterstitialConfig } from '@ionic-native/admob-free/ngx';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.page.html',
  styleUrls: ['./show-profile.page.scss'],
})
export class ShowProfilePage implements OnInit {

  constructor(private mainservice:MainService,private admobFree: AdMobFree,) { 
    this.showInterstitialAds();
    this.mainservice.getProfileData(this.mainservice.profileID).subscribe((res) => {
        this.ProfileData.push(res);
      });
  }

  ProfileData =[];

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
