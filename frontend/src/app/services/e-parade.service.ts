import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as global from '../global-variable';

@Injectable({
  providedIn: 'root'
})
export class EParadeService {

  constructor(public http: HttpClient) { }

  retrieveParadeState(userInfo): Observable<any> {
    return this.http.post(global.apiUrl + '/e-parade/retrieve-parade-state', userInfo).pipe(map(result => {
      return result;
    }));
  }
}
