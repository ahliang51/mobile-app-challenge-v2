import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as global from '../global-variable';

@Injectable({
  providedIn: 'root'
})
export class ERationService {

  constructor(public http: HttpClient) { }

  checkRationSubmitted(userInfo): Observable<any> {
    return this.http.post(global.apiUrl + '/e-ration/check-ration-submitted', userInfo).pipe(map(result => {
      return result;
    }));
  }

  submitRation(userInfo): Observable<any> {
    return this.http.post(global.apiUrl + '/e-ration/submit-ration', userInfo).pipe(map(result => {
      return result;
    }));
  }
}
