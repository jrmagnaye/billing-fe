import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Barangay } from '../models/barangay';
import { API_VERSION, BASE_PATH } from '../variable';

@Injectable({
  providedIn: 'root'
})
export class BarangayService {
protected basePath ="/";
protected apiVersion ="1";
  constructor(
    protected httpClient : HttpClient,
     @Inject(BASE_PATH) basePath : string,
     @Inject(API_VERSION) apiVersion : string,
  ) {
    this.basePath =basePath;
    this.apiVersion =apiVersion;
   }
   getBarangaysForDropDown():Observable<any>{
    return this.httpClient.get<Barangay[]>(`${this.basePath}/api/v${this.apiVersion}/administration/barangay/list-for-dropdown`)
    .pipe(
      map((response) => response),
      catchError((error) => {
        return throwError(error);
      })
    );
   }
}
