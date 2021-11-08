import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryNavigator } from '../../base-navigator/category-navigator/category-navigator';
//import { ToastyService, ToastyConfig } from 'ng2-toasty';
import { MatTabGroup } from '@angular/material/tabs';
import { NavigatorTransferEnum } from './shared/navigator-transfer.enum';
import { Utilities } from '@shared/utilities';
import { BasicInformationTransferComponent } from '../basic-information-transfer/basic-information-transfer.component';
import { FeaturesTransferComponent } from '../features-transfer/features-transfer.component';
import { PoliciesTransferComponent } from '../policies-transfer/policies-transfer.component';
import { SettingTransferComponent } from '../setting-transfer/setting-transfer.component';
import { DriversTransferComponent } from '../drivers-transfer/drivers-transfer.component';
import { Router } from '@angular/router';
import { RateSetupTransferComponent } from '../rate-setup-transfer/rate-setup-transfer.component';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonLoadingModalComponent } from '@commons/common-loading-modal/common-loading-modal.component';
import { CommonLoadingModalEnum } from '@commons/common-loading-modal/shared/common-loading-modal.enum';
import { ViewDetailsTransferService } from 'app/pages/transfer/view-details-transfer/shared/view-details-transfer-service';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';

@Component({
  selector: 'app-navigator-transfer',
  templateUrl: './navigator-transfer.component.html',
  styleUrls: ['./navigator-transfer.component.css', 
  '../../base-navigator/base-navigator.component.css']
})
export class NavigatorTransferComponent extends CategoryNavigator implements OnInit {

  @ViewChild("tabs") tabGroup : MatTabGroup; 
  navigatorTransfer = NavigatorTransferEnum;

  @ViewChild(BasicInformationTransferComponent) basicInformation : BasicInformationTransferComponent;
  @ViewChild(FeaturesTransferComponent)         features         : FeaturesTransferComponent;
  @ViewChild(DriversTransferComponent)          drivers          : DriversTransferComponent;
  @ViewChild(PoliciesTransferComponent)         policies         : PoliciesTransferComponent;
  @ViewChild(SettingTransferComponent)          settings         : SettingTransferComponent;
  @ViewChild(RateSetupTransferComponent)        rates            : RateSetupTransferComponent;
  vehiclesList : any;
  driversList : any;
  transferId: number;  
  modalRef: MatDialogRef <CommonLoadingModalComponent>;

  constructor(
    //public toastr: ToastyService,
    //private toastyConfig: ToastyConfig, 
    private cookieService: CookieService,
    private router: Router, public dialog: MatDialog, 
    private detailstransferService: ViewDetailsTransferService ) {
    super();
  }

  ngOnInit() {
    this.arrayGenericFormsTabs = [
      this.basicInformation,
      this.features,
      this.drivers,
      this.policies,
      this.rates,
      this.settings,
    ];

    Utilities.log('cookieService: ', this.cookieService.get(NavigatorTransferEnum.selectedTransferIdCookieName));

    let transferId = this.cookieService.get(NavigatorTransferEnum.selectedTransferIdCookieName);
    if(transferId !== '') {
      this.transferId = Number(transferId);
      setTimeout(() => this.fillCompleteInfo(), NavigatorTransferEnum.one);
    }
  }

  validateNextTab() {
    let url = this.router.url;
    if( url.indexOf(NavigatorTransferEnum.features) !== NavigatorTransferEnum.negativeValue)
      this.tabGroup.selectedIndex = NavigatorTransferEnum.featureStep;
    else if( url.indexOf(NavigatorTransferEnum.settings) !== NavigatorTransferEnum.negativeValue)
      this.tabGroup.selectedIndex = NavigatorTransferEnum.settingStep;
    else if( url.indexOf(NavigatorTransferEnum.drivers) !== NavigatorTransferEnum.negativeValue)
      this.tabGroup.selectedIndex = NavigatorTransferEnum.driversStep;
    else if( url.indexOf(NavigatorTransferEnum.rates) !== NavigatorTransferEnum.negativeValue)
      this.tabGroup.selectedIndex = NavigatorTransferEnum.ratesStep;
  }

  fillCompleteInfo(): void {

    this.modalRef = this.dialog.open( CommonLoadingModalComponent, {
       disableClose: true,
       height: CommonLoadingModalEnum.heightModal.toString(),
       width:  CommonLoadingModalEnum.widthModal.toString(),   
     });
     this.detailstransferService.getDetails(String(this.transferId)).subscribe((data:any) => {
       Utilities.log('fillCompleteInfo: ',data);
         this.completeInfo  = data.data;
         this.modalRef.close();
         this.validateNextTab();    
     });
   }
  /**
   * @deprecated this function is only for development purpose
   */
  hackToAnotherTab(): void {
    this.transferId = NavigatorTransferEnum.transferIdDummy;
	  this.tabGroup.selectedIndex = NavigatorTransferEnum.settingStep;
  }

  continue($event): void {
    if (this.tabGroup.selectedIndex <= NavigatorTransferEnum.settingStep) {
      let genericForm = this.arrayGenericFormsTabs[this.tabGroup.selectedIndex] as AbstractGenericFormComponent;

      Utilities.log('genericForm: ',genericForm.formGroup);
      
      if (genericForm.formGroup && genericForm.formGroup.valid) {
        let result = genericForm.onSubmit() 
        .then(res => { this.validateSubmitResponse(res)})
        .catch(error => {this.showSaveError()});

      } else {
        //this.toastr.error(NavigatorTransferEnum.incompleteFormErrorMessage);
      }
    }
  }

  validateSubmitResponse(result) {
    if (result) {
      this.grabInformation(result);
      this.goNextTab();
    } 
    else {
      this.showSaveError();
    }
  }

  grabInformation(submitResult: any): void {  
    this.transferId = (this.tabGroup.selectedIndex  == NavigatorTransferEnum.basicInformationStep ) ? submitResult.id : this.transferId;

    switch(this.tabGroup.selectedIndex) {
      case  NavigatorTransferEnum.featureStep: this.vehiclesList = submitResult.vehiclesList;
        break;
      case  NavigatorTransferEnum.driversStep: this.driversList = submitResult.driversList;
        break;
      case  NavigatorTransferEnum.policiesStep: let charges = Array.from(submitResult.extraCharges);
                                                this.rates.sendCharges(charges);
        break;
    }
  }

  goNextTab() {
    this.tabGroup.selectedIndex++;
    if((this.tabGroup._tabs.toArray().length)-NavigatorTransferEnum.one != this.tabGroup.selectedIndex)
      this.tabGroup._tabs.toArray()[this.tabGroup.selectedIndex + NavigatorTransferEnum.one].disabled = false;
    else {
      this.tabGroup.selectedIndex=NavigatorTransferEnum.zero;
      this.router.navigate([NavigatorTransferEnum.redirect+this.transferId]);
    }
  }

  showSaveError() {
  }

  getIdTab(index: number) {
    if(this.arrayGenericFormsTabs[index] == this.features) {
      this.features.loadPhotos();
    }
  }

}
