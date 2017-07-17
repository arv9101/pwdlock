import { Component, OnInit } from '@angular/core';
import { LoginService } from "app/_services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, public router: Router) { }

  ngOnInit() {
    localStorage.setItem('username', "");
    localStorage.setItem('token', "");
  }

   onSubmit(value: any){ 
    this.loginService.login(value.emailid, value.passwd)
                     .subscribe(response => {

                       // Check Token
                       if(response.token){
                            console.log('Redirect to User Page.');
                            this.router.navigate(['/user']);

                            // Save Deatils in LocalStorage
                            localStorage.setItem('username', response.username);
                            localStorage.setItem('token', response.token);

                       } else {
                         console.log('Invalid Username or Password. Please try again.');
                       }

                }, error => { alert('Wrong Username or Password.'); } );
  }

}
