import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private router: Router, private mainSer :MainService) {
   }

  ngOnInit() {
  }
  

  wanttoKnow(){
    this.mainSer.wanttoKnow();
  }

  wanttoTell(){
    this.mainSer.wanttoTell();
  }

}
