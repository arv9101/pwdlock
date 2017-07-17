import { Component, OnInit } from '@angular/core';
import { UserService } from "app/_services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  providers: [UserService]
})
export class CardsComponent implements OnInit {

  newBank; newNameoncard; newDigits; newExp; key; newAlgorithm;

  cards: any = [];

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

    this.getCards();
  }

    getCards(){
    // To get UserData
      this.userService.getAllCards(localStorage.getItem('username')).subscribe(
      response => {
        this.cards = response.cards;
      },
      error => {
        console.log('Couldnt get all cards.');
      }
    );
    // END of get Userdata
  }

  addNewCard(newBank, newNameoncard, newDigits, newExp, key, newAlgorithm){
    if(!key){
      window.alert('Insert Key')
    } else {
      if(!newBank || !newNameoncard || !newDigits || !newExp){
        window.alert('Enter Bank Name, Name on the Card, Card number and Validity.')
      } else {
        if(!newAlgorithm){
            newAlgorithm = 'aes-256-ctr';
        }
        var data = {
          'bank': newBank, 'name': newNameoncard, 'digits': newDigits, 'exp': newExp, 'key': key, 'algorithm': newAlgorithm
        };
        this.userService.addNewCard(localStorage.getItem('username'), data).subscribe(
          response => {
            console.log('New Card Added.');
            window.location.reload();
          },
          error => {
            console.log('Could Not Add New Card.');
          }
        );
      }
    }
  }

  delWebsite(card){
    if(window.confirm('Do you want to delete this card?')){
      this.userService.delCard(localStorage.getItem('username'),card).subscribe(
          response => {
            console.log('Card Deleted.');
            window.location.reload();
          },
          error => {
            console.log('Could Not Delete Card.');
            window.alert("Could Not Delete Card. \n Please refresh page and try again WITHOUT using 'Show' option.")
          }
        );
    }
  }

  show(nameoncard, digits, exp, key, index){
    var data = {
      'name': nameoncard,
      'digits': digits,
      'exp': exp,
      'key': key,
      'algorithm': 'aes-256-ctr'
    }
    this.userService.decryptCard(data).subscribe(
          response => {
            this.cards[index].name = response.name;
            this.cards[index].digits = response.digits;
            this.cards[index].exp = response.exp;
          },
          error => {
            console.log('Could Not Decrypt.');
          }
        );
  }

}
