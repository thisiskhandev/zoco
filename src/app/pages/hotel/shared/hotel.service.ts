import { Injectable } from '@angular/core';
import { BasicInformationEnum } from '../basic-information-hotel/shared/basic-information-enum';
import { BasicInformationHotel } from '../basic-information-hotel/shared/basic-information-hotel-model';
import { Environment } from 'environments/environment';
import { AbstractService } from '@shared/abstract.service';
import { Utilities } from '@shared/utilities';

import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class HotelService extends AbstractService {

  private basicInfoURLToSave = Environment.hotelApiUrl;
  private stablishmentTypeUrl = Environment.stablishmentTypeApiUrl;
  private customerTypesUrl = Environment.customerTypesApiUrl;

  isEstablishmentNameAvailable(establishmentName: string) {
    let booleanToReturn = false;
    this.selectedErrorMessage = BasicInformationEnum.establishmentNameIsNoAvailableErrorMessage;
    return this.http
    .post(Environment.isEstablishmentNameAvailableApiUrl, JSON.stringify({establishmentName: establishmentName}), {headers: this.getHeaders()})
     .map(res => res)
     .map((data:any) => data.isEstablishmentNameAvailable as boolean);
  }

  getStablishmentType() {
    try{
      this.selectedErrorMessage = BasicInformationEnum.getStablishmentTypeErrorMessage;
      return this.http.get(this.stablishmentTypeUrl);
    }
    catch(e){
      this.handleError(e);
    }
  }

  getCustomerTypes() {
    this.selectedErrorMessage = BasicInformationEnum.getCustomerTypesErrorMessage;
    try{
      return this.http.get(this.customerTypesUrl);
    }
    catch(e){
      this.handleError(e);
    }
  }

  saveBasicInfo(basicInfoModel: BasicInformationHotel): Promise<BasicInformationHotel> {
    if (basicInfoModel.id) {
      return this.putBasicInfo(basicInfoModel);
    }

    return this.postBasicInfo(basicInfoModel);
  }

  putBasicInfo(basicInfoModel: BasicInformationHotel): Promise<BasicInformationHotel> {

    this.selectedErrorMessage = BasicInformationEnum.updateBasicInfoErrorMessage;

    console.log("PRUEBAAAAAAAAAAA PUT NORMAL");
    console.log(this.basicInfoURLToSave + Utilities.urlRouteSeparator + basicInfoModel.id);
    console.log(JSON.stringify(basicInfoModel));
    console.log("PRUEBAAAAAAAAAAA PUT NORMAL");

    return this.http
      .put(this.basicInfoURLToSave + Utilities.urlRouteSeparator + basicInfoModel.id, JSON.stringify(basicInfoModel), { headers: this.getHeaders() })
      .toPromise()
      .then((res:any) => {
        //this.toastr.success(LayoutEnum.saveBasicInfoSuccessfullMessage); 
        return res.data; 
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  postBasicInfo(basicInfoModel: BasicInformationHotel): Promise<BasicInformationHotel> {

    console.log("PRUEBAAAAAAAAAAA POST NORMAL");
    console.log(this.basicInfoURLToSave);
    console.log(JSON.stringify(basicInfoModel));
    console.log("PRUEBAAAAAAAAAAA POST NORMAL");

    this.selectedErrorMessage = BasicInformationEnum.saveBasicInfoErrorMessage;
    
    return this.http.post(this.basicInfoURLToSave, JSON.stringify(basicInfoModel), { headers: this.getHeaders() })
        .toPromise()
        .then( (res: any) => {
          //this.toastr.success(LayoutEnum.saveBasicInfoSuccessfullMessage); 

          this.makeFileRequest(basicInfoModel.filesToUpload, res.data.id, basicInfoModel.nameFolder);

          return res.data; 
        })
        .catch(error => {
          this.handleError(error);
        });
  }

  showError(messageError){   
        //this.toastr.error(messageError);        
  }

}
