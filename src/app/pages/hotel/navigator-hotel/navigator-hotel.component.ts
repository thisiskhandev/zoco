import { Component, OnInit, ViewContainerRef, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { CategoryNavigator } from '../../base-navigator/category-navigator/category-navigator';
import { NavigatorEnum } from '../shared/navigator-enum';

//import { ToastyService, ToastyConfig } from 'ng2-toasty';
import { BasicInformationHotelComponent } from '../basic-information-hotel/basic-information-hotel.component';
import { GeneralDescriptionHotelComponent } from '../general-description-hotel/general-description-hotel.component';
import { LayoutComponent } from '../layout/layout.component';
import { AmenitiesHotelComponent } from '../amenities-hotel/amenities-hotel.component';
import { PhotosHotelComponent } from '../photos-hotel/photos-hotel.component';
import { PaymentPoliciesHotelComponent } from '../payment-policies-hotel/payment-policies-hotel.component';
import { Utilities } from '@shared/utilities';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ViewDetailsHotelService } from '@hotel/view-details-hotel/shared/view-details-hotel-service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonLoadingModalComponent } from '@commons/common-loading-modal/common-loading-modal.component';
import { CommonLoadingModalEnum } from '@commons/common-loading-modal/shared/common-loading-modal.enum';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';
import { MatTabGroup } from '@angular/material/tabs';
import { InfoPropertyHotelComponent } from '../info-property-hotel/info-property-hotel.component';


@Component({
  selector: 'app-navigator-hotel',
  templateUrl: './navigator-hotel.component.html',
  styleUrls: ['./navigator-hotel.component.css',
  '../../base-navigator/base-navigator.component.css']
})
export class NavigatorHotelComponent extends CategoryNavigator implements OnInit, AfterViewInit {

  @ViewChild("tabs") tabGroup : MatTabGroup;
  
  @ViewChild(BasicInformationHotelComponent) basicInformation : BasicInformationHotelComponent;
  @ViewChild(InfoPropertyHotelComponent) infoPropertyHotel : InfoPropertyHotelComponent;
  @ViewChild(LayoutComponent) layout : LayoutComponent;
  @ViewChild(AmenitiesHotelComponent) amenities : AmenitiesHotelComponent;
  @ViewChild(PhotosHotelComponent) photos : PhotosHotelComponent;
  @ViewChild(PaymentPoliciesHotelComponent) paymentPolicies : PaymentPoliciesHotelComponent;

  modalRef: MatDialogRef <CommonLoadingModalComponent>;
  arrayGenericFormsTabs;
  establishmentId: number;
  establishmentName: string;
  establishmentTotalRooms: number;
  navigatorEnum = NavigatorEnum;  
  displayAccordion : boolean = false;
  hotelCompleteInfo: any;  

  constructor(//public toastr:ToastyService, 
    //private toastyConfig: ToastyConfig, 
    private router : Router,
    private cookieService: CookieService, private detailsHotelService: ViewDetailsHotelService,
    public dialog: MatDialog ) {
    super();
  }

  ngOnInit() {
    Utilities.log('cookieService: ',this.cookieService.get(NavigatorEnum.selectedEstablishmentIdCookieName));

    let selectedEstablishmentId = this.cookieService.get(NavigatorEnum.selectedEstablishmentIdCookieName);
    if(selectedEstablishmentId !== '') {
      this.establishmentId = Number(selectedEstablishmentId);
      setTimeout(() => this.fillCompleteInfo(), NavigatorEnum.dialogTimeOut);
    }
  }

  ngAfterViewInit() {
    this.arrayGenericFormsTabs = [
      this.basicInformation, 
      this.infoPropertyHotel,
      this.layout,
      this.amenities,
      this.photos,
      this.paymentPolicies
    ];

    console.log("this.arrayGenericFormsTabs");
    console.log(this.arrayGenericFormsTabs);
    
    // Habilita todos los TABS
    for(let i = 0; i < 6; i++)
      this.tabGroup._tabs.toArray()[i].disabled = false;
    
  }

  fillCompleteInfo(): void {

   this.modalRef = this.dialog.open( CommonLoadingModalComponent, {
      disableClose: true,
      height: CommonLoadingModalEnum.heightModal.toString(),
      width:  CommonLoadingModalEnum.widthModal.toString(),   
    });
    this.detailsHotelService.getDetails(String(this.establishmentId)).subscribe((data:any) => {
      this.hotelCompleteInfo = data.data;

      console.log("Entre al servicio a cambiar");
      console.log("Entre al servicio a cambiar");
      console.log("Entre al servicio a cambiar");
      console.log("Entre al servicio a cambiar");
      console.log("Entre al servicio a cambiar");
      console.log("Entre al servicio a cambiar");
      this.modalRef.close();
    });
  }

  /**
   * @deprecated this function is only for development purpose
   */
  hackToAnotherTab(): void {
    this.tabGroup.selectedIndex = NavigatorEnum.photosStep-1;
    this.establishmentId = NavigatorEnum.establishmentIdDummy;
    this.establishmentName = NavigatorEnum.establishmentNameDummy ;
    this.establishmentTotalRooms = NavigatorEnum.establishmentTotalRoomsDummy;
  }

  continue($event): void {
    //habilita el próximo TAB

    let genericForm = this.arrayGenericFormsTabs[this.tabGroup.selectedIndex] as AbstractGenericFormComponent;

    let isReadyToContinue: boolean = genericForm && genericForm.isReadyToContinue();

    if (this.tabGroup.selectedIndex + 1 <= NavigatorEnum.paymentAndPoliciesStep) {
      console.log("CONTINUAR COMPONENT");

      console.log("genericForm");
      console.log(genericForm);

      console.log("genericForm.formGroup");
      console.log(genericForm.formGroup);
      
      console.log("genericForm.formGroup.valid");
      console.log(genericForm.formGroup.valid);

      console.log("isReadyToContinue");
      console.log(isReadyToContinue);

      console.log("genericForm.isEveryChildComponentValid()");
      console.log(genericForm.isEveryChildComponentValid());


      Utilities.log('genericForm: ', genericForm.formGroup);

      if ((genericForm.formGroup && genericForm.formGroup.valid && isReadyToContinue)
            || (genericForm.formGroup && genericForm.isEveryChildComponentValid() && isReadyToContinue)) {
        //salva el formGroup
        Utilities.log('((genericForm.formGroup && genericForm.formGroup.valid && isReadyToContinue || (genericForm.formGroup && genericForm.isEveryChildComponentValid() && isReadyToContinue');
        let result = genericForm.onSubmit() 
        .then(res => { this.validateSubmitResponse(res)})
        .catch(error => {this.showSaveError()});
      } else if(!isReadyToContinue) {
        Utilities.log('else if(!isReadyToContinue)');
        if(genericForm.formGroup.valid )
          genericForm.onSubmit();
        //this.toastr.info(genericForm.viewErrorMessage);
      }
      else {
        console.log("Error")
        //this.toastr.error(NavigatorEnum.incompleteFormErrorMessage);
      }
    }
    
    if(this.tabGroup.selectedIndex === 3) {
      this.photos.loadPhotos();
    }
  }

  validateSubmitResponse(result) {
    if (result) {
      this.grabHotelInformation(result);
      this.goNextTab();
    } 
    else {
      this.showSaveError();
    }
  }

  grabHotelInformation(submitResult: any): void {
    if (++this.tabGroup.selectedIndex === NavigatorEnum.basicInformationStep ) {
      this.establishmentId = submitResult.id;
      this.establishmentName =  submitResult.establishment_name;
      Utilities.log('grabHotelInformation: ',this.establishmentId,this.establishmentName);
    }
  }

  goNextTab() {
    this.tabGroup.selectedIndex++;
    if((this.tabGroup._tabs.toArray().length)-NavigatorEnum.valueOne != this.tabGroup.selectedIndex)
      this.tabGroup._tabs.toArray()[this.tabGroup.selectedIndex + NavigatorEnum.valueOne].disabled = false;
    else {
      this.tabGroup.selectedIndex=NavigatorEnum.valueZero;
      this.router.navigate([NavigatorEnum.redirect+this.establishmentId]);
    }      

    

    
  }

  showSaveError() {
    console.log("Error saving model");
  }  

  onNotifyEstablishmentName(hotelName: string): void {
    this.establishmentName = hotelName;
  }

  onNotifyEstablishmentTotalRooms(establishmentTotalRooms: number): void {
    this.establishmentTotalRooms = establishmentTotalRooms;
  }

  getIdTab(index: number) {
    if(this.arrayGenericFormsTabs[index] == this.amenities) {
      this.displayAccordion = true;
    } 
    else {
      this.displayAccordion = false;
    }
  }
}
