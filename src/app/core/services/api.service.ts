import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpBackend
} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {
  Observable,
  throwError
} from 'rxjs';
import {
  catchError, map, tap
} from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpHeaderOptions:any;
  constructor(
    private http: HttpClient,
    private handler: HttpBackend
  ) {
    this.httpHeaderOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    }
   }

   apiExecutor(api:any, param: any): Observable<any> {
    return this.http.post(environment.BASE_ENDPOINT+api, JSON.stringify(param),this.httpHeaderOptions);
   }
}
