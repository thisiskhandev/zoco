import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, NgForm } from '@angular/forms';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';
import { VehicleInfoEnum } from './shared/vehicle-info.enum';
import { VehicleInfoModel } from './shared/vehicle-info.model';
import { GenericModel } from '@shared/generic-model';
import { Utilities } from '@shared/utilities';
//import { ToastyService } from 'ng2-toasty';
import { VehicleListComponent } from '../vehicle-list/vehicle-list.component';
import { CustomValidator } from '@shared/customValidator';

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css']
})
export class VehicleInfoComponent extends AbstractGenericFormComponent implements OnInit {

  @ViewChild(VehicleListComponent) vehicleListComponent : VehicleListComponent;
  @Input() model: VehicleInfoModel;
  @Input() vehicleList:  Array<VehicleInfoModel>;

  typeDropdownOptions: Array<GenericModel>;
  categoryDropdownOptions: Array<GenericModel>;
  vehicleBelongingTypes: Array<GenericModel>;  
  vehicleInfoEnum = VehicleInfoEnum;
  customValidator = CustomValidator;
  
  constructor(private formBuilder: FormBuilder, 
    //public toastr:ToastyService
  ) { 
    super();
  }

  ngOnInit() {
    this.typeDropdownOptions = VehicleInfoEnum.vehicleTypes;
    this.categoryDropdownOptions = VehicleInfoEnum.vehicleCategories;
    this.vehicleBelongingTypes = VehicleInfoEnum.vehicleBelongingTypes;
    this.initForm();
  }

  initForm(): void { 
    this.initEmptyForm(this.formBuilder);
  }

  transformGroupToModel() {
    return this.model;
  }

  onSubmit() {
    return this.vehicleListComponent.onSubmit();
  }

  addFeature(ngForm?: NgForm): void {
    this.model.index = this.vehicleListComponent.featuresList.length + this.utilities.one;
    if( this.validateData(this.model) ) {
        this.getDescription(this.model);
        this.vehicleListComponent.refreshTable(this.model);
        this.cleanInput();
        if(ngForm)
          ngForm.resetForm();
    }
    else {
      this.showErrorMessage();
    }    
  }


  addAllFeatures(): void {
    this.vehicleListComponent.featuresList = [];
    this.vehicleList.forEach(vehicle => {
      this.model = vehicle;
      this.addFeature();
    });
  }


  validateData(feature : VehicleInfoModel) : boolean {

    let isAnyNull: boolean = feature != null && feature.category != null && feature.type != null && feature.ownedBy != null;
    let isBrandModelTransporTypeNotEmpty: boolean = (isAnyNull === true) && (feature.brand!='') && (feature.modelType!='') && feature.isPrivate != null;
    let isCapacityQuantityNotEmpty: boolean = false;

    if(feature.quantity != null && feature.capacity != null){
      isCapacityQuantityNotEmpty = feature && (feature.capacity).toString()!='' && (feature.quantity).toString()!='';
    }

    return isBrandModelTransporTypeNotEmpty && isCapacityQuantityNotEmpty;

  }

  getDescription(model : VehicleInfoModel) {
    let category = this.categoryDropdownOptions.find(this.findIndexToUpdate, model.category);
    model.categoryName = category.name;

    let type = this.typeDropdownOptions.find(this.findIndexToUpdate, model.type);
    model.typeDescription = type.name;

    let owned = this.vehicleBelongingTypes.find(this.findIndexToUpdate, model.ownedBy);
    model.ownedDescription = owned.name;
  }

  findIndexToUpdate(data) { 
    return data.id == this;
  }

  cleanInput() {
    this.model = new VehicleInfoModel();
  }

  showErrorMessage() {
    //this.toastr.error(VehicleInfoEnum.incompleteInfoMesssage);
  }


  ngOnChanges(changes: SimpleChanges) {
    for (let name in changes) {
      if(name == VehicleInfoEnum.vehicleListVariableName 
          && this.vehicleList) {
        this.addAllFeatures();
        break;
      }
    }
  }


}
