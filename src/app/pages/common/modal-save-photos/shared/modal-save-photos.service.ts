import { Injectable } from '@angular/core';
import { AbstractService } from '@shared/abstract.service';
import { ModalSavePhotosEnum } from './modal-save-photos-enum';
import { Utilities } from '@shared/utilities';
import { HttpHeaders, JsonpClientBackend } from '@angular/common/http';

@Injectable()
export class ModalSavePhotosService extends AbstractService {

  savePhotos(photo: FormData, method: string, apiUrl : string, id : number) : Promise<any> {
    if(method == ModalSavePhotosEnum.putMethod || method == ModalSavePhotosEnum.deleteMethod)
      apiUrl = apiUrl + Utilities.urlRouteSeparator + id;
    
    if(method == ModalSavePhotosEnum.putMethod || method == ModalSavePhotosEnum.postMethod) { 
      return this.postInfoPhotos(photo, apiUrl);
    }    
    else if(method == ModalSavePhotosEnum.deleteMethod)
      return this.deletePhotos(apiUrl);
  }  

  postInfoPhotos(photo: FormData, apiUrl : string) : Promise<any> {

    const _headers = new HttpHeaders();

    _headers.append('Content-Type', 'application/json');
		_headers.append('Content-Type', 'multipart/form-data');

    var object = {};
    photo.forEach((value, key) => {object[key] = value});
    var json = JSON.stringify(object);

    this.selectedErrorMessage = ModalSavePhotosEnum.messageErrorSavePhotos;
    return this.http.post(apiUrl, photo, { headers: _headers } )
    .toPromise()
    .then((res:any) => {
      return res.data;         
    })
    .catch(error => {
      console.log(error);
    });
  }

  deletePhotos(apiUrl: string) : Promise<any> {

    this.selectedErrorMessage = ModalSavePhotosEnum.messageErrorDeletePhotos;
    return this.http.delete(apiUrl)
    .toPromise()
    .then((res:any) => {
      return res.message;         
    })
    .catch(error => {
    });
  }

  showError(messageError) {   
    //this.toastr.error(messageError);
  }

  showMessageSuccessFullSavePhotos() {   
    //this.toastr.success(ModalSavePhotosEnum.messageSuccessFullSavePhotos);
  }

}
