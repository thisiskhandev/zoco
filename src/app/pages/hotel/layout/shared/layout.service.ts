import { Injectable } from '@angular/core';
import { LayoutEnum } from './layout-enum';
import { LayoutModel } from './layout-model';
//import 'rxjs/add/operator/toPromise';
import { Environment } from 'environments/environment';
import { AbstractService } from '@shared/abstract.service';
import { Utilities } from '@shared/utilities';
 
@Injectable()
export class LayoutService extends AbstractService {

  saveLayoutInfo(layoutModel: LayoutModel): Promise<LayoutModel> {
    if (layoutModel.id) {
      return this.putLayout(layoutModel);
    }
    return this.postLayout(layoutModel);
  }

  putLayout(layoutModel: LayoutModel): Promise<any> {
    this.selectedErrorMessage = LayoutEnum.updateLayoutErrorMessage;
        return this.http
          .put(Environment.layoutApiUrl+Utilities.urlRouteSeparator+layoutModel.id, JSON.stringify(layoutModel), { headers: this.getHeaders() })
            .toPromise()
            .then((res:any) => {
              //this.toastr.success(LayoutEnum.saveBasicInfoSuccessfullMessage); 
              return res.data; 
            })
            .catch(error => {
              this.handleError(error);
            });
  }


  postLayout(layoutModel: LayoutModel): Promise<LayoutModel> {
        this.selectedErrorMessage = LayoutEnum.saveLayoutErrorMessage;
            return this.http
              .post(Environment.layoutApiUrl, JSON.stringify(layoutModel), { headers: this.getHeaders() })
                .toPromise()
                .then((res:any) => {
                  //this.toastr.success(LayoutEnum.saveBasicInfoSuccessfullMessage); 
                  return res.data; 
                })
                .catch(error => {
                  this.handleError(error);
                });
    }

    getLayoutList(establishmentId: number): any {
      try{
        this.selectedErrorMessage = LayoutEnum.getLayoutListErrorMessage;
        return this.http.post(Environment.layoutApiUrl+Utilities.urlRouteSeparator+establishmentId, { headers: this.getHeaders() }).map((res:any) => res);
      }
      catch(e) {
        this.handleError(e);
      }
    }


    deleteLayoutInfo(id: number): any {
      return this.http
        .delete(Environment.layoutApiUrl + Utilities.urlRouteSeparator + id).map((res:any) => res);
    }

}