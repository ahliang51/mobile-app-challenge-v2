import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as global from '../global-variable';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(public http: HttpClient) { }

  retrieveCamp(): Observable<any> {
    return this.http.get(global.apiUrl + '/address-book/camps').pipe(map(result => {
      return result;
    }));
  }

  signUp(userInfo): Observable<any> {
    return this.http.post(global.apiUrl + '/auth/sign-up', userInfo).pipe(map(result => {
      return result;
    }));
  }

  login(userInfo): Observable<any> {
    return this.http.post(global.apiUrl + '/auth/login', userInfo).pipe(map(result => {
      return result;
    }));
  }
}
