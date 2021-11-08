import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { IPais } from './ipais';
import { Environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class CountryService {
    public url = Environment.countriesApiUrl;
    public countriesFilteredByNameUrl = Environment.countriesFilteredByNameApiUrl;
    public countriesFilteredByCallingCodeApiUrl = Environment.countriesFilteredByCallingCodeApiUrl;

    constructor(private _http: HttpClient) {
    }

    getPaisesFilteredByName(queryCountryName: string): Observable<any> {
        const myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json, text/plain, */*');
        return this._http.get(this.countriesFilteredByNameUrl + queryCountryName);
        //.map((response: Response) => {
        //           return <IPais[]>response.json();
        //      })
    }

   getCountriesFilteredByCallingCode(callingCode: number): Observable<any> {
        const myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json, text/plain, */*');
        return   this._http.get(this.countriesFilteredByCallingCodeApiUrl + callingCode);
        // .map((response: Response) => {
        //         return <IPais[]>response.json();
        // })
    }


    getCountryFilteredByCallingCode() {
        const myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json, text/plain, */*');
        
    }


    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

    getPaises() {
        return this._http.get(this.url);
    }

}
