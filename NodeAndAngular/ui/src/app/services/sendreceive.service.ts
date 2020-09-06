import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import 'rxjs/add/operator/map';
import { map, catchError } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class SendreceiveService {
  private _jwtToken = "";
  private HTTP_REQUEST_PARAMS = {
    HEADER_CONTENT_TYPE: { value: 'application/json; charset=UTF-8', valueContains: 'application/json;' }
  };
  constructor(private http: Http) { }


  public send(msgToSend): Observable<any> {
    console.log(" came here ");
    try {
      let lstrURL = environment.url;
      // let headers1 = { 'Content-Type': this.HTTP_REQUEST_PARAMS.HEADER_CONTENT_TYPE.value, "jwttoken": this.getJWTToken() };
      let headers1 = { 'Content-Type': this.HTTP_REQUEST_PARAMS.HEADER_CONTENT_TYPE.value };
      let headers = new Headers(headers1);
      let options = new RequestOptions({ headers: headers });

      return this.http.post(lstrURL, JSON.stringify(msgToSend), options)
        .pipe(map(this.extractData.bind(this)),
          catchError(this.handleError.bind(this)))
    } catch (e) {
      console.log('SendReceiveService - send - error' + JSON.stringify(e));
    }
  }

  private extractData(res: Response) {
    let body = res.json();
    try {
      console.log('SendReceiveService - extractData - this._sequence : ' + JSON.stringify(body));
      const headers = JSON.stringify(res.headers);
      console.log('SendReceiveService - headers - headers : ' + headers);

      //setting jwtToken
      if (JSON.parse(headers)["jwttoken"] != undefined && JSON.parse(headers)["jwttoken"] != null) {
        this.setJWTToken(JSON.parse(headers)["jwttoken"]);
      }

      if (res.json()) {
        console.log("assssssss");
      } else body = res.text();
      console.log('SendReceiveService - extractData: ' + JSON.stringify(res));
      console.log('SendReceiveService - extractData body: ' + JSON.stringify(body));

      return body || {};
    } catch (error) {
      console.log(" error in extract data " + error.message);
      return body || {};
    }
  }


  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? '${error.status} - ${error.statusText}' : 'Server error';

    console.log('SendReceiveService - handleError - errMsg: ' + errMsg);

    console.log('SendReceiveService - handleError ');
    if (error === null || error === 'null') {
      console.log('SendReceiveService - send' + 'Null Data in Response');
    } else {
      let lobjErrorResponse = (error.error);
      console.log('error: ' + JSON.stringify(error));
      console.log('error: ' + (error.error.responseCode));
      let lintResponseCode = lobjErrorResponse.responseCode;
      console.log('SendReceiveService - send - responseCode' + lintResponseCode);
    }
    return Observable.throw(errMsg);
  }

  reset(): void {
    this._jwtToken = "";
  }

  setJWTToken(jwtToken): void {
    this._jwtToken = jwtToken;
  }

  getJWTToken(): string {
    return this._jwtToken;
  }
}
