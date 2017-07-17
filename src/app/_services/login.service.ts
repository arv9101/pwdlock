import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor (private http: Http) {}
  
  login(uname, pword) {
    return this.http.post('/api/auth',{username: uname, password: pword})
                    .map((res:Response) => res.json());
  }

}
