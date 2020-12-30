import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-new-user-tc',
  templateUrl: './new-user-tc.page.html',
  styleUrls: ['./new-user-tc.page.scss'],
})
export class NewUserTCPage implements OnInit {

  constructor(private router: Router, public mainSer: MainService) { }

  ngOnInit() {
  }
  navigateToProfilePage(){
    this.router.navigate(['/profile']);
    this.mainSer.profileNonEditable();
  }

  
}
