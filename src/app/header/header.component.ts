import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() marginleft = new EventEmitter<number>();
  menuBtn: boolean;

  currentUser = localStorage.getItem('username');

  constructor() { }

  ngOnInit() {
    this.menuBtn = false;
  }

  toggleNav(){
    if(this.menuBtn == true){
      this.menuBtn = false;
      this.marginleft.emit(0);
    } else {
      this.menuBtn = true;
      this.marginleft.emit(250);
    }
  }

}
