import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import { Environment } from 'environments/environment';
import { UsblickCommonEnum } from '../usblick-common-enum';
import { HttpClient } from '@angular/common/http';


@Injectable()

export class AuthService {
	public baseUrl : string;

	constructor(private _http : HttpClient){
		this.baseUrl = Environment.authApiUrl;
	}

	validate (data : any, type : string ) { // validates the token
		let json = JSON.stringify(data);
		let headers = new Headers();
		headers.append(UsblickCommonEnum.headerAuthorization, type + UsblickCommonEnum.spaceChar + data.token);
		headers.append(UsblickCommonEnum.headerContentType, UsblickCommonEnum.appJsonType);
		return this._http.post(this.baseUrl + UsblickCommonEnum.validService, json);
	}

	logout(data: any){
		let json = JSON.stringify(data);
		let headers = new Headers();
		headers.append(UsblickCommonEnum.headerAuthorization, UsblickCommonEnum.Bearer + UsblickCommonEnum.spaceChar + data.auth_token);
		headers.append(UsblickCommonEnum.headerContentType, UsblickCommonEnum.appJsonType);

		return this._http.post(this.baseUrl + UsblickCommonEnum.logoutService, json);
	}	

	getCookie(name : string){
	    var nameEQ = encodeURIComponent(name) + UsblickCommonEnum.equalChar;
	    var ca = document.cookie.split(UsblickCommonEnum.dotCommaChar);
	    for (var i = 0; i < ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) === UsblickCommonEnum.spaceChar)
	            c = c.substring(1, c.length);
	        if (c.indexOf(nameEQ) === 0)
	            return decodeURIComponent(c.substring(nameEQ.length, c.length));
	    }
	    return null;
	}

	/**
	 * Cookie Register
	 * @param cname 
	 * @param cvalue 
	 * @param exdays exdays = -1,  to delete  cookie.|  exdays = null, to inifinite. 
	 */
	setCookie(cname :string, cvalue : string, exdays : number) {
		if (exdays){
			var d = new Date();
			var totalmseconds = exdays*UsblickCommonEnum.hoursByDay*UsblickCommonEnum.minutesByHour*UsblickCommonEnum.secondsByMinute*UsblickCommonEnum.milisecondBySecond;
		    d.setTime(d.getTime() + (totalmseconds));
		    var expires = UsblickCommonEnum.expiresCookie + d.toUTCString();
			document.cookie = cname + UsblickCommonEnum.equalChar + cvalue + 
								UsblickCommonEnum.dotCommaChar + expires + UsblickCommonEnum.pathCookie;
		} else {
			document.cookie = cname + UsblickCommonEnum.equalChar + cvalue + UsblickCommonEnum.pathCookie;
		}
	}

}