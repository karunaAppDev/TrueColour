import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user-policy',
  templateUrl: './new-user-policy.page.html',
  styleUrls: ['./new-user-policy.page.scss'],
})
export class NewUserPolicyPage implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }

  naviageteToTC(){
    this.router.navigate(['/new-user-tc']);
  }

}
