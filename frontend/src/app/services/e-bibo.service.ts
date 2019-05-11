import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as global from '../global-variable';

@Injectable({
  providedIn: 'root'
})
export class EBiboService {

  constructor(public http: HttpClient) { }

  bookIn(userInfo): Observable<any> {
    return this.http.post(global.apiUrl + '/e-bibo/book-in', userInfo).pipe(map(result => {
      return result;
    }));
  }

  bookOut(userInfo): Observable<any> {
    return this.http.post(global.apiUrl + '/e-bibo/book-out', userInfo).pipe(map(result => {
      return result;
    }));
  }

  checkBiboStatus(userInfo): Observable<any> {
    return this.http.post(global.apiUrl + '/e-bibo/check-bibo-status', userInfo).pipe(map(result => {
      return result;
    }));
  }
}
