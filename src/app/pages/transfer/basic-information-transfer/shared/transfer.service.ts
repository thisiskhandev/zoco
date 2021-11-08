import { Injectable, ViewContainerRef } from '@angular/core';
//import { Headers, Http, Response } from '@angular/http';
import { BasicInformationTransferEnum } from './basic-information-transfer.enum';
import { BasicInformationTransferModel } from './basic-information-transfer.model';
//import 'rxjs/add/operator/toPromise';
import { Environment } from 'environments/environment';
//import { ToastsManager } from 'ng2-toastr';
import { isSuccess } from 'angular-in-memory-web-api';
import { AbstractService } from '@shared/abstract.service';
import { Utilities } from '@shared/utilities';

@Injectable()

export class TransferService extends AbstractService{
  private basicInfoURLToSave = Environment.transferApiUrl;
  
  isTransferNameAvailable(name:string){
  var nameValidatorApiUrl = Environment.isNameAvailableApiUrl;
  var nameValidatorErrorMessage = BasicInformationTransferEnum.transferNameIsNoAvailableErrorMessage;
  this.isNameAvailable(name ,nameValidatorApiUrl ,nameValidatorErrorMessage);
  }

  saveBasicInfo(basicInfoModel: BasicInformationTransferModel): Promise<BasicInformationTransferModel> {
    if (basicInfoModel.id) {
      return this.putBasicInfo(basicInfoModel);
    }
    return this.postBasicInfo(basicInfoModel);
  }

	postBasicInfo(basicInfoModel: BasicInformationTransferModel): Promise<BasicInformationTransferModel> {
    this.selectedErrorMessage = BasicInformationTransferEnum.saveBasicInfoErrorMessage;
        return this.http
          .post(this.basicInfoURLToSave, JSON.stringify(basicInfoModel), )
            .toPromise()
            .then((res:any) => {
              //this.toastr.success(LayoutEnum.saveBasicInfoSuccessfullMessage); 
              return res.data; 
            })
            .catch(error => {
              this.handleError(error);
            });
  }

  putBasicInfo(basicInfoModel: BasicInformationTransferModel): Promise<BasicInformationTransferModel> {
    this.selectedErrorMessage = BasicInformationTransferEnum.updateBasicInfoErrorMessage;
    return this.http
      .put(this.basicInfoURLToSave+Utilities.urlRouteSeparator+basicInfoModel.id, JSON.stringify(basicInfoModel), )
      .toPromise()
      .then((res:any) => {
        //this.toastr.success(LayoutEnum.saveBasicInfoSuccessfullMessage); 
        return res.data; 
      })
      .catch(error => {
        this.handleError(error);
      });
  }
}