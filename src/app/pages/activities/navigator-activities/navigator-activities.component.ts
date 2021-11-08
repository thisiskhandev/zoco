import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryNavigator } from '../../base-navigator/category-navigator/category-navigator';
import { MatTabGroup } from '@angular/material/tabs';
import { BasicInformationActivitiesComponent } from '../basic-information-activities/basic-information-activities.component';
import { NewActivityComponent } from '../new-activity/new-activity.component';
import { PoliciesPaymentActivitiesComponent } from '../policies-payment-activities/policies-payment-activities.component';
//import { ToastyService, ToastyConfig } from 'ng2-toasty';
import { Utilities } from '@shared/utilities';
import { NavigatorActivitiesEnum } from '../shared/navigator-activities-enum';
import { RatesActivitiesComponent } from '../rates-activities/rates-activities.component';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigator-activities',
  templateUrl: './navigator-activities.component.html',
  styleUrls: ['./navigator-activities.component.css']
})
export class NavigatorActivitiesComponent extends CategoryNavigator implements OnInit {

  // @ViewChild(NavigatorActivitiesEnum.tabs) tabGroup : MatTabGroup;
  @ViewChild("tabs") tabGroup : MatTabGroup;
  @ViewChild(BasicInformationActivitiesComponent) basicInformation : BasicInformationActivitiesComponent;
  @ViewChild(NewActivityComponent) newActivity : NewActivityComponent;
  @ViewChild(PoliciesPaymentActivitiesComponent) policiesPayment : PoliciesPaymentActivitiesComponent;
  @ViewChild(RatesActivitiesComponent) ratesActivitiesComponent : RatesActivitiesComponent;
  basicInformationId: number;
  activityId: number;
  subActivitiesList : Array<any>;
  arrayGenericFormsTabs;
 
  constructor(//public toastr:ToastyService, 
    //private toastyConfig: ToastyConfig, 
    private router : Router) { 
    super();
    this.activityId = null;
  }

  ngOnInit() {
    this.arrayGenericFormsTabs = [
      this.basicInformation, 
      this.newActivity,
      this.policiesPayment,
      this.ratesActivitiesComponent
    ];
    
    this.validateNextTab();
  }

  validateNextTab() {
    let url = this.router.url;
    if( url.indexOf(NavigatorActivitiesEnum.rates) !== NavigatorActivitiesEnum.negativeValue)
      this.tabGroup.selectedIndex = NavigatorActivitiesEnum.ratesStep-1;
  }

  fillCompleteInfo() {    
  }

  hackToAnotherTab() {
    this.tabGroup.selectedIndex = NavigatorActivitiesEnum.newActivitysStep-1;
    this.activityId = NavigatorActivitiesEnum.valueOne;
  }

  continue($event): void {
    //habilita el próximo TAB
    if (this.tabGroup.selectedIndex + NavigatorActivitiesEnum.valueOne <= NavigatorActivitiesEnum.ratesStep) {
      let genericForm = this.arrayGenericFormsTabs[this.tabGroup.selectedIndex] as AbstractGenericFormComponent;
      Utilities.log('genericForm: ',genericForm.formGroup);
      //valida el formulario
      if (genericForm.formGroup && genericForm.formGroup.valid) {
        //salva el formGroup
        let result = genericForm.onSubmit() 
        .then(res => { this.validateSubmitResponse(res)})
        .catch(error => {this.showSaveError()});
      } else {
        //this.toastr.error(NavigatorActivitiesEnum.incompleteFormErrorMessage);
      }
    }
  }
  
  validateSubmitResponse(result) {
    if (result) {
      this.grabActivityInformation(result);
      this.goNextTab();
    } 
    else {
      this.showSaveError();
    }
  }

  grabActivityInformation(submitResult: any): void {
    if (++this.tabGroup.selectedIndex  == NavigatorActivitiesEnum.basicInformationStep ) {
      this.basicInformationId = submitResult.id;
    }

    if (++this.tabGroup.selectedIndex  == NavigatorActivitiesEnum.newActivitysStep ) {
      this.activityId = submitResult.id;
      this.subActivitiesList = submitResult.itinerary.subActivitiesList;
    }
  }

  goNextTab() {
    this.tabGroup.selectedIndex++;
    if((this.tabGroup._tabs.toArray().length)-NavigatorActivitiesEnum.valueOne != this.tabGroup.selectedIndex)
      this.tabGroup._tabs.toArray()[this.tabGroup.selectedIndex + NavigatorActivitiesEnum.valueOne].disabled = false;
    else {
      this.tabGroup.selectedIndex=NavigatorActivitiesEnum.valueZero;
      // TODO: Se cambia el redirect del detalle de activity a la lista porque aun no se tiene el servicio del api que devuelve el detalle del activity.
      //this.router.navigate([NavigatorActivitiesEnum.redirect+this.activityId]);
      this.router.navigate([NavigatorActivitiesEnum.redirect]);
    }
  }

  showSaveError() {
  }

}
