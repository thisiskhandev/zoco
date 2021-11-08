import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import { AuthService } from '../com.usblick.common/auth/auth.service';
import { Environment } from '../../../environments/environment';
import { UsblickCommonEnum } from '../com.usblick.common/usblick-common-enum';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserData {
    public data: any;
    public baseUrl : string;

    public constructor(
    	private _http : HttpClient,
    	private _authService : AuthService,
    	) {
        this.baseUrl = Environment.authApiUrl;

			let data : any = {};
			data.auth_token = this._authService.getCookie(UsblickCommonEnum.cookieName);

	    this.getUser(data).subscribe(
	      (data:any) => {
	        if(data.res == UsblickCommonEnum.okResp) {
	           this.data = data.det;
	        } else {
	        }
	      },
	      error => {
	      }
	    );
     }

    getUser(data:any) {
		let headers = new Headers();
		headers.append(UsblickCommonEnum.headerAuthorization, UsblickCommonEnum.Bearer + UsblickCommonEnum.spaceChar + data.auth_token);
		return this._http.get(this.baseUrl+UsblickCommonEnum.userCurrentService);
    }
}
