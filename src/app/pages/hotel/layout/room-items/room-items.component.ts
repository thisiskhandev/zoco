import { Component, OnInit, ViewContainerRef, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';
import { FormBuilder, Validators  } from '@angular/forms';
//import { ToastsManager } from 'ng2-toastr';
import { GenericModel } from '@shared/generic-model';
import { CustomValidator } from '@shared/customValidator';
import { RoomItemEnum } from './shared/room-items-enum';
import { RoomItemsModel } from './shared/room-items-model';
import { Utilities } from '@shared/utilities';
import { LayoutEnum } from '@hotel/layout/shared/layout-enum';

@Component({
  selector: 'app-room-items-layout-hotel',
  templateUrl: './room-items.component.html',
  styleUrls: ['./room-items.component.css','../../shared/hotel.css', '../layout.component.css']
})
export class RoomItemsComponent extends AbstractGenericFormComponent implements OnInit {

  roomItemEnum = RoomItemEnum;

  unitOfMeasurementTypes: Array<GenericModel>;

  constructor(private formBuilder: FormBuilder, 
    //public toastr: ToastsManager,
    public vcr: ViewContainerRef) {
    super();
    //this.toastr.setRootViewContainerRef(vcr);    
   }

  ngOnInit(): void {
    this.initForm();
  }

  getUnitOfMeasurementTypes(): void {


    let squareMetersUnit = new GenericModel();
    let squareFeetUnit= new GenericModel();

    squareMetersUnit.id = RoomItemEnum.squareMetersId;
    squareMetersUnit.desc = RoomItemEnum.squareMetersDesc;

    squareFeetUnit.id =   RoomItemEnum.squareFeetId; 
    squareFeetUnit.desc = RoomItemEnum.squareFeetDesc;

    this.unitOfMeasurementTypes = [
      squareMetersUnit,
      squareFeetUnit
    ];
  }

  initForm(): void {
    this.getUnitOfMeasurementTypes();
    this.initFormGroup();
  }

  initFormGroup(): void {
    this.formGroup = this.formBuilder.group( {
      roomTotalMeasure: [this.model.roomTotalMeasure, 
        Validators.compose([
        CustomValidator.onlyNumberValidator,
        Validators.maxLength(RoomItemEnum.roomTotalMeasureMaxSize)])],
        unitOfMeasurement: [this.model.unitOfMeasurement, 
          Validators.compose([
            CustomValidator.onlyNumberValidator])],
    });
  }

  fillUnitOfMeasureTypeDescToModel(): void {
    this.model.unitOfMeasurementName = (this.unitOfMeasurementTypes[Number(this.model.unitOfMeasurement)-this.utilities.one]) ?	this.unitOfMeasurementTypes[Number(this.model.unitOfMeasurement)-this.utilities.one].desc : null;
  }


  onSubmit(): RoomItemsModel {
    this.fillUnitOfMeasureTypeDescToModel();
    return this.model;
  }

}
