import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate : any;
  constructor(
    private menu: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {
    this.sideMenu();
    this.initializeApp();
    
  }

  sideMenu()
  {
    this.navigate =
    [
      {
        title : "Home",
        url   : "/home",
        icon  : "home"
       
      },
      {
        title : "Profile",
        url   : "/creator-profile",
        icon  : "person-circle-outline"
      },
      {
        title : "Feedback",
        url   : "/feedback",
        icon  : "chatbox-ellipses-sharp"
       
      },
      {
        title : "Privacy Policy",
        url   : "/privacypolicy",
        icon  : "document-text-outline"
      },
      {
        title : "Terms and Conditions",
        url   : "/termsandcondition",
        icon  : "documents-sharp"
      },
      {
        title : "Logout",
        url   : "/logout",
        icon  : "log-out-outline"
      },
    ]
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 5000);
      this.statusBar.styleDefault();
      this.checkDarkTheme();
    });
  }

  checkDarkTheme(){
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      if(prefersDark.matches){
        document.body.classList.toggle('dark');
      }else{
        document.body.classList.toggle('dark');
      }
      
  }
}
