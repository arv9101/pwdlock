import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  checkToken(token){
    return this.http.get('/api/check/'+token).map((res:Response) => res.json());
  }

  addNewWebsite(username,data){
    return this.http.put('/userdata/'+username,data)
                    .map((res:Response) => res.json());
  }

  getAllWebsites(username){
    return this.http.get('/userdata/'+username)
                    .map((res:Response) => res.json());
  }

  delWebsite(username, website){
    return this.http.delete('/userdata/'+username+'/'+website)
                    .map((res:Response) => res.json());
  }

  decrypt(data){
    return this.http.post('/crypt',data)
                    .map((res:Response) => res.json());
  }




  addNewCard(username,data){
    return this.http.put('/usercard/'+username,data)
                    .map((res:Response) => res.json());
  }

  getAllCards(username){
    return this.http.get('/usercard/'+username)
                    .map((res:Response) => res.json());
  }

  delCard(username, card){
    return this.http.delete('/usercard/'+username+'/'+card)
                    .map((res:Response) => res.json());
  }

  decryptCard(data){
    return this.http.post('/crypt/card/',data)
                    .map((res:Response) => res.json());
  }

}
