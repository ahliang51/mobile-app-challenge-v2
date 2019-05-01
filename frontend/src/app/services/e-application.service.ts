import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as global from '../global-variable';


@Injectable({
  providedIn: 'root'
})
export class EApplicationService {

  constructor(public http: HttpClient) { }

  retrievePersonnel(userInfo): Observable<any> {
    return this.http.post(global.apiUrl + '/e-application/retrieve-personnel', userInfo).pipe(map(result => {
      return result;
    }));
  }

  retrieveOffBalance(userId): Observable<any> {
    return this.http.post(global.apiUrl + '/e-application/retrieve-off-balance', { userId: userId }).pipe(map(result => {
      return result;
    }));
  }

  updateOffBalance(userInfo): Observable<any> {
    return this.http.post(global.apiUrl + '/e-application/update-off-balance', userInfo).pipe(map(result => {
      return result;
    }));
  }
}
