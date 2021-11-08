import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { IPais } from './ipais';
import { Environment } from '../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CountryService {
    public $environment;
    public url = Environment.countriesApiUrl;
    public countriesFilteredByNameUrl = Environment.countriesFilteredByNameApiUrl;
    public countriesFilteredByCallingCodeApiUrl = Environment.countriesFilteredByCallingCodeApiUrl;

    constructor(private _http: HttpClient) {
        this.$environment = Environment;
    }

    getCountries(): Observable<any> {
        return this._http.get(this.$environment.countriesUsblickUrl, { headers: this._headers() });
    }
    
    getStatesByCountry(countryID: string): Observable<any> {
        let urlStates: string = this.$environment.statesUsblickUrl + countryID;
        
        return this._http.get(urlStates, { headers: this._headers() });
    }
    
    // Set Header options
    public _headers() {
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
    
        return headers;
    }

   getPaisesFilteredByName(queryCountryName: string): Observable<any> {
       const myHeaders = new Headers();
       myHeaders.append('Accept', 'application/json, text/plain, */*');
       return   this._http
      .get(this.countriesFilteredByNameUrl + queryCountryName)
      .map((response: Response) => {
                 return <any>response.json();
             })
   }

   getCountriesFilteredByCallingCode(callingCode: number): Observable<any> {
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json, text/plain, */*');
    return   this._http
   .get(this.countriesFilteredByCallingCodeApiUrl + callingCode)
   .map((response: Response) => {
              return <any>response.json();
          })
}


    getCountryFilteredByCallingCode() {
        const myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json, text/plain, */*');
        
    }


    private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

    getPaises() {
        return this._http.get(this.url).map((res:any) => res);
    }

}
