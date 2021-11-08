import { Injectable } from '@angular/core';
import { Environment } from 'environments/environment';
//import { ToastsManager } from 'ng2-toastr';
import { LanguageEnum } from './language-enum';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LanguageService {

  private selectedErrorMessage: string;

  constructor(
    private http: HttpClient, 
    //public toastr: ToastsManager
  ) {
  }

  getLanguages() {
    try {
      this.selectedErrorMessage = LanguageEnum.messageErrorGetLanguages;
      return this.http.get(Environment.languagesApiUrl);
    }
    catch(e) {
      this.handleError(e);
    }
  }

  showError(messageError){   
    //this.toastr.error(messageError);
  }

  private handleError(error: any): Promise<any> {
    //this.toastr.error(this.selectedErrorMessage);
    return Promise.reject(error.message || error);
  }

  private getHeaders(): Headers{
    return new Headers({
        'Content-Type': Environment.jsonContentType
    });
  }
}
