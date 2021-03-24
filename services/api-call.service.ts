import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import {  HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiCallService {

  apiRoot = "http://localhost:4200/api";
  constructor(private http: HttpClient) { 

  } 

headers = new HttpHeaders().set('Content-Type','application/json');
params: URLSearchParams = new URLSearchParams();
//to get inventory list
getInventoryList(): Observable<any> {
  return this.http.get(`${this.apiRoot}`, { headers: this.headers, responseType: 'json'}).pipe(
    map((res: Response) => {
      return res || {}
    }),
    catchError(this.handleError)
  )
}

//to delete an item
deleteItem(index): Observable<any> {
  return this.http.get(`${this.apiRoot}/deleteitem?id=${index}`,{ headers: this.headers, responseType: 'json'}).pipe(
    map((res: Response) => {
      return res || {}
    }),
    catchError(this.handleError)
  )
}

//to add new item
addItem(data): Observable<any> {
  let body = JSON.stringify(data);
  console.log(body)
  return this.http.post(`${this.apiRoot}/additem`,data,{ headers: this.headers, responseType: 'json'}).pipe(
    map((res: Response) => {
      return res || {}
    }),
    catchError(this.handleError)
  )
}

//error handling
handleError(error: HttpErrorResponse) {
  let msg = '';
  if (error.error instanceof ErrorEvent) {
    // client-side error
    msg = error.error.message;
  } else {
    // server-side error
    msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  return throwError(msg);
}
 
}
