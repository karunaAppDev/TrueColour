import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { MainService } from '../main.service';
import { userData } from '../userinfo/userinfo.module';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { userProfile } from '../userinfo/userProfile.module';
import { SearchPipe } from '../search.pipe';
import { AdMobFree,AdMobFreeBannerConfig} from '@ionic-native/admob-free/ngx';

@Component({
  selector: 'app-want-to-know',
  templateUrl: './want-to-know.page.html',
  styleUrls: ['./want-to-know.page.scss'],
})
export class WantToKnowPage {

  constructor(private mainservice: MainService,private router: Router,private admobFree: AdMobFree,) {

    // this.showBannerAds();
  }
  dispalySearchResult =false;
  dispalyadvenceSearchResult=false;
  searchValue ;
  userDetails: userData[];
  profileDetails: userProfile[];
  isLoading = false;
  imageUrl:any;
  advanceSearchdiv =false;
  citystat;
  footer =true;
  advancedSearch =false;
  searchbar =false;
  advancedSearchcancel =false;
 
  
  private user: Subscription;
  private profile: Subscription;
  ngOnInit() {
    this.user = this.mainservice.userDetailsarray.subscribe(
      userData =>{
      this.userDetails = userData;
    });
  }

  ngOnDestroy(){

  }

  showAdvanceSearch(){
    this.searchbar =true;
    this.advanceSearchdiv =true;
    this.advancedSearchcancel =true;
  }

  cancelAdvanceSearch(){
    this.searchbar =false;
    this.advancedSearch =false;
    this.advanceSearchdiv =false;
    this.advancedSearchcancel =false;
    location.reload();
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.mainservice.getALLData().subscribe(() => {
      this.isLoading = false;
    });
  }

  onSearch(event){
    this.footer =false;
    this.dispalySearchResult = true;
    this.advancedSearch = true;
    if(event.target.value== ""){
      this.footer =true;
      this.advancedSearch = false;
    }
   
  }

  dispalyadvenceSearchResults(event){
    this.dispalySearchResult = false;
    this.dispalyadvenceSearchResult =true;
    this.footer =false;
    if(event.target.value== ""){
      this.footer =true;
      this.dispalyadvenceSearchResult = false;
    }
  }
  
  getAllData() {
    console.log( "observable data" +this.userDetails);
    this.mainservice.getALLData().subscribe(
      res => console.log('HTTP get all response ', res),
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.'));
  }

  loadProfile(id){
    this.mainservice.setUserId(id);
    this.router.navigate(['/userdetails']);
  }

  home(){
    this.mainservice.home();
  }

  wanttoTell(){
    this.mainservice.wanttoTell();
  }


  showBannerAds(){
    const BannerCConfig : AdMobFreeBannerConfig ={
      autoShow : true,
      // id :'ca-app-pub-4663109527121211/9301996210',
      isTesting : true
    };
    this.admobFree.banner.config(BannerCConfig)
    this.admobFree.banner.prepare().then(()=>{
    }).catch(err=>alert(err))
}

}



