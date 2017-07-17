import { Component, OnInit } from '@angular/core';
import { UserService } from "app/_services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  newWebsite; newUname; newPwd; key; newAlgorithm;
  
  sites: any = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.key='';

    // To Check Validity Of Token
    this.userService.checkToken(localStorage.getItem('token')).subscribe(
      response => {
      },
      error => {
        localStorage.setItem('username', "");
        localStorage.setItem('token', "");
        this.router.navigate(['/']);
      }
    );
    // END of Check Validity of Token

    this.getWebsites();
  }

  getWebsites(){
    // To get UserData
      this.userService.getAllWebsites(localStorage.getItem('username')).subscribe(
      response => {
        this.sites = response.websites;
      },
      error => {
        console.log('Couldnt get all websites.');
      }
    );
    // END of get Userdata
  }

  addNewWebsite(newWebsite, newUname, newPwd, key, newAlgorithm){
    if(!key){
      window.alert('Insert Key')
    } else {
      if(!newWebsite || !newUname || !newPwd){
        window.alert('Enter Website Name, Username and Password.')
      } else {
        if(!newAlgorithm){
            newAlgorithm = 'aes-256-ctr';
        }
        var data = {
          'website': newWebsite, 'uname': newUname, 'pwd': newPwd, 'key': key, 'algorithm': newAlgorithm
        };
        this.userService.addNewWebsite(localStorage.getItem('username'), data).subscribe(
          response => {
            console.log('New Website Added.');
            window.location.reload();
          },
          error => {
            console.log('Could Not Add New Website.');
          }
        );
      }
    }
  }

  delWebsite(website){
    if(window.confirm('Do you want to delete website?')){
      this.userService.delWebsite(localStorage.getItem('username'),website).subscribe(
          response => {
            console.log('Website Deleted.');
            window.location.reload();
          },
          error => {
            console.log('Could Not Delete Website.');
          }
        );
    }
  }

  show(website, uname, pwd, key, index){
    var data = {
      'website': website,
      'uname': uname,
      'pwd': pwd,
      'key': key,
      'algorithm': 'aes-256-ctr'
    }
    this.userService.decrypt(data).subscribe(
          response => {
            this.sites[index].uname = response.uname;
            this.sites[index].pwd = response.pwd;
          },
          error => {
            console.log('Could Not Decrypt.');
          }
        );
  }

}
