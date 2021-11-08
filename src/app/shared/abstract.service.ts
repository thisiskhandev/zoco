import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Injectable, ViewContainerRef } from '@angular/core';

//import { ToastsManager } from 'ng2-toastr';
import { Environment } from '../../environments/environment';
//import { ToastyService, ToastyConfig } from 'ng2-toasty';
import { GenericFormModel } from '@shared/generic-form-model';
import { AbstractGenericFormEnum } from '@shared/abstract-generic-form-enum';
import { Utilities } from '@shared/utilities';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export abstract class AbstractService {

    protected selectedErrorMessage: string;
    protected messageErrorUpdate : string = AbstractGenericFormEnum.messageErrorUpdate;
    protected messageSuccessFullUpdate : string = AbstractGenericFormEnum.messageSuccessFullUpdate;
    protected messageErrorSave : string = AbstractGenericFormEnum.messageErrorSave;
    protected messageSuccessFullSave : string = AbstractGenericFormEnum.messageSuccessFullSave;
    protected apiUrl: string;
    public environment;

    constructor(protected http: HttpClient, //public toastr: ToastyService, private toastyConfig: ToastyConfig) 
    ){
      this.environment = Environment;
    }

    protected getHeaders(): HttpHeaders {
      return new HttpHeaders({
        'Content-Type': Environment.jsonContentType
      });
    }

    protected handleError(error: any): Promise<any> {
        //this.toastr.error(this.selectedErrorMessage);
        return Promise.reject(error.message || error);
    }

    save(model: GenericFormModel): Promise<GenericFormModel> {

      if(model.id) {
        return this.putInfo(model);
      }
      return this.postInfo(model);
    }

  
    putInfo(model: GenericFormModel): Promise<GenericFormModel> {

      console.log("PRUEBAAAAAAAAAAA PUT ABSTRACT");
      console.log(this.apiUrl + Utilities.urlRouteSeparator + model.id);
      console.log(JSON.stringify(model));
      console.log("PRUEBAAAAAAAAAAA PUT ABSTRAC");

      this.selectedErrorMessage = this.messageErrorUpdate;
      return this.http
        .put(this.apiUrl + Utilities.urlRouteSeparator + model.id, JSON.stringify(model), { headers: this.getHeaders() })
        .toPromise()
        .then((res:any) => {
          //this.toastr.success(this.messageSuccessFullUpdate)
          return res.data;
        })
        .catch(error => {
          this.handleError(error);
        });
    }
  
    postInfo(model: GenericFormModel): Promise<any> {
      this.selectedErrorMessage = this.messageErrorSave;

      console.log("PRUEBAAAAAAAAAAA POST ABSTRAC");
      console.log(this.apiUrl + Utilities.urlRouteSeparator + model.id);
      console.log(JSON.stringify(model));
      console.log("PRUEBAAAAAAAAAAA POST ABSTRAC");
  
      return this.http
        .post(this.apiUrl, JSON.stringify(model), { headers: this.getHeaders() })
        .toPromise()
        .then((res:any) => {
          //this.toastr.success(LayoutEnum.saveBasicInfoSuccessfullMessage); 
          return res.data; 
        })
        .catch(error => {
          this.handleError(error);
        });
    }
  
    showError(messageError){   
      //this.toastr.error(messageError);
    }    

    isNameAvailable(name: string, nameValidatorApiUrl: string, nameValidatorErrorMessage: string) {
      this.selectedErrorMessage = nameValidatorErrorMessage;
      return this.http
      .post(nameValidatorApiUrl, JSON.stringify({name: name}), { headers: this.getHeaders() });
      //  .map(res => res.json())
      //  .map(data => data.name as boolean);
    }

    makeFileRequest(files: File, id: string, nameFolder: string) {
      const formData: any = new FormData();
      let path: any =" ";

      if(files) {
         formData.append('file',files, files.name);
         formData.append('nameFolder',nameFolder);
      }

      return new Promise( (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
          if(xhr.status == 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
          }
        };
        xhr.open('POST', `${this.environment.urlUpload}/${id}`, true);
        path = xhr.send(formData);
      });
  }
}
                        