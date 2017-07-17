import { Component, OnInit } from '@angular/core';
import { UserService } from "app/_services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [UserService]
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {    
     // To Check Validity Of Token
    this.userService.checkToken(localStorage.getItem('token')).subscribe(
      response => {
      },
      error => {
        localStorage.setItem('username', "");
        localStorage.setItem('token', "");
        //this.router.navigate(['/']);
      }
    );
    // END of Check Validity of Token

  }

}
