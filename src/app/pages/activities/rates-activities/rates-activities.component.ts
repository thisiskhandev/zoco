import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { RatesActivitiesEnum, DataRatesActivities } from './shared/rates-activities-enum';
import { RatesActivitiesModel, RatesActivitiesItemModel } from './shared/rates-activities-model';
import { FormBuilder } from '@angular/forms';
import { GenericModel } from '@shared/generic-model';
import { RatesActivitiesService } from './shared/rates-activities.service';
import { ExcludeTaxesComponent } from '@commons/exclude-taxes/exclude-taxes.component';
//import { ToastyService } from 'ng2-toasty';
import { ListRatesComponent } from './list-rates/list-rates.component';
import { AbstractGenericParentComponent } from '@shared/abstract-generic-parent.component';
import { CustomValidator } from '@shared/customValidator';


@Component({
  selector: 'app-rates-activities',
  templateUrl: './rates-activities.component.html',
  styleUrls: ['./rates-activities.component.css']
})
export class RatesActivitiesComponent extends AbstractGenericParentComponent implements OnInit {

  @Input() activityId : number;
  @Input() activitiesOptions : Array<any>;
  @ViewChild(ExcludeTaxesComponent) excludeTaxesComponent : ExcludeTaxesComponent;
  @ViewChild(ListRatesComponent) listRatesComponent : ListRatesComponent;
  ratesActivitiesEnum = RatesActivitiesEnum;
  customValidator = CustomValidator;
  personOptions : Array<GenericModel>;
  itemModel : RatesActivitiesItemModel;
  
  constructor(private formBuilder: FormBuilder, 
    //public toastr:ToastyService,
    private service:RatesActivitiesService) {
    super();
    this.model = new RatesActivitiesModel();
    this.itemModel = new RatesActivitiesItemModel();
  }

  ngOnInit() {
    this.personOptions = DataRatesActivities.personArray;
    this.initForm();
  }

  ngAfterViewInit() {
    this.formGroup.addControl(RatesActivitiesEnum.excludeTaxes, this.excludeTaxesComponent.formGroup);
    this.excludeTaxesComponent.formGroup.setParent(this.formGroup);
  }

  initForm() {
    this.initEmptyForm(this.formBuilder);
  }

  onSubmit() {
    this.model.activityId = this.activityId;
    return this.service.save(this.model);
  }

  addRate() {
    if(this.itemModel.subActivityId != null && this.itemModel.idPersonType != null &&
      this.itemModel.price!=null ) {
        this.getDescription();
        this.model.ratesList.push(this.itemModel);
        this.listRatesComponent.refresh();
        this.initItemModel();
    }
    else {
      this.showErrorMessage();
    }    
  }

  getDescription() {
    let item = this.personOptions.find(this.findIndexToUpdate, this.itemModel.idPersonType);
    this.itemModel.namePersonType = item.name;

    let obj = this.activitiesOptions.find(this.findIndex, this.itemModel.subActivityId);
    this.itemModel.nameSubActivity = obj.subActivityName;
  }

  findIndexToUpdate(data) { 
    return data.id == this;
  }

  findIndex(data) { 
    return data.subActivityId == this;
  }

  initItemModel() {
    this.itemModel = new RatesActivitiesItemModel();
  }

  showErrorMessage() {
    //this.toastr.error(RatesActivitiesEnum.incompleteInfoMesssage);
  }

}

