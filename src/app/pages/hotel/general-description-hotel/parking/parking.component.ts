import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { ParkingEnum } from './shared/parking-enum';
import { ParkingModel } from './shared/parking-model';
import { GenericModel } from '@shared/generic-model';
import { ParkingService } from './shared/parking.service';
import { CustomValidator } from '@shared/customValidator';
import { Utilities } from '@shared/utilities';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css', './../../shared/hotel.css']
})
export class ParkingComponent extends AbstractGenericFormComponent implements OnInit, OnChanges {

  @Input() model: ParkingModel;
  hasParkingOptions: Array <any>;
  parkingEnum = ParkingEnum;
  parkingAccessOptions: Array <GenericModel>;
  parkingLocationsOptions: Array <GenericModel>;
  parkingConditionsOptions: Array <GenericModel>;
  formGroupParking: FormGroup;
  modelAux: any;
  isInit: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private parkingService: ParkingService) {
      super();
  }

  ngOnInit() {
    this.initForm();
    this.initFormGroup();
  }

  ngOnChanges() {
    if((this.modelExists()) && (!this.isInit)) {
      this.initFormGroup();
      this.isInit = true;
    }
    else {
      Utilities.log("The internet model doesn't exists");
    }
  }

  modelExists(): boolean {
    for(let property in this.model)
      if( this.model[property] )
        return true
    
    return false;
  }

  initFormGroup(): void {
    this.formGroupParking = this.formBuilder.group( {
      hasParking: [this.model.hasParking, Validators.required],
      parkingCondition: [this.model.parkingCondition, Validators.required],
      parkingAccess: [this.model.parkingAccess, Validators.required],
      parkingLocation: [this.model.parkingLocation, Validators.required],
      parkingPrice: [this.model.parkingPrice, [ Validators.required, Validators.maxLength(this.parkingEnum.parkingPriceInputMaxSize), Validators.pattern('0*[1-9][0-9]*$')]],

    })
    this.setValueChangeListener();   
    this.isValid.emit(this.formGroupParking.valid);
  }

  /*
    "parking": {
        "hasParking": "0",
        "payParking": false,
        "parkingCondition": 2,
        "parkingAccess": 2,
        "parkingLocation": 2,
        "parkingPrice": 0
    },
  */

  initForm() {
    this.getParkingAccess();
    this.getParkingLocations();
    this.getParkingConditions();
    this.initEmptyForm(this.formBuilder);
  }

  getParkingAccess() : void {
    this.parkingAccessOptions = [];
    this.parkingService.getParkingAccess().subscribe(data=>
      data.data.forEach(parkingTypeAccess => {
        const parkAccess = parkingTypeAccess as GenericModel;
        this.parkingAccessOptions.push(parkAccess);
      })
    );
  }

  getParkingLocations() : void {
    this.parkingLocationsOptions = [];
    this.parkingService.getParkingLocations().subscribe(data=>
      data.data.forEach(parkingTypeLocation => {
        const parkLocat = parkingTypeLocation as GenericModel;
        this.parkingLocationsOptions.push(parkLocat);
      })
    );
  }

  getParkingConditions() : void {
    this.parkingConditionsOptions = [];
    this.parkingService.getParkingConditions().subscribe(data=>
      data.data.forEach(parkingTypeConditions => {
        const parkLoc = parkingTypeConditions as GenericModel;
        this.parkingConditionsOptions.push(parkLoc);
      })
    );
  }

  clearParking(){
    switch(this.model.hasParking) {
      case ParkingEnum.noParking: {
        this.model.parkingAccess = this.model.parkingLocation = this.model.parkingCondition = this.model.parkingPrice = null;
        break;
      }     
      case ParkingEnum.parkingFree: {
        this.model.parkingPrice = null;
        break;
      }
    }
  }

  resetFormField(formField: AbstractControl, control: string): void {
    formField.reset();
    formField.setValue(this.modelAux[control]);
    this.formGroupParking.setControl(control, formField);  
  }

  transformGroupToModel(): void {
    
    if(this.formGroupParking.dirty) {
      let formField: AbstractControl;
      delete this.model.id;
      delete this.modelAux.id;

      for(let attribute in this.model) {
          formField = this.formGroupParking.get(attribute) as FormArray;

          if(formField.dirty) {

            this.modelAux[attribute] = formField.value;
            this.resetFormField(formField, attribute);
          }
          else if(!formField.dirty) {
            delete this.modelAux[attribute];
          }
      }

      if(this.modelAux.hasOwnProperty("parkingPrice")) {
        this.modelAux["payParking"] = "true";
      }
      else {
        this.modelAux["payParking"] = "false";
        this.modelAux.parkingPrice = "0";
      }
    } else {
      this.modelAux = {};
      Utilities.log("Invalid form or has not been modified. INTERNET");
    }
  }

  onSubmit() {
    this.modelAux = this.model = new ParkingModel();

    this.transformGroupToModel();

    this.model = this.modelAux;

    return this.model;
  }

  // checkIfParkingIsValid(): void {
  //   if(this.model.hasParking === Utilities.emptyLengthString){
  // this.transformGroupToModel()
  //   }
  // }
  // onSubmit() {
  //   this.checkIfParkingIsValid();
  //   return this.model;
  // }

  // transformGroupToModel() {
  //   this.model.parkingAccess = this.model.parkingAccess === null ? ParkingEnum.defaultDropdownSelection : this.model.parkingAccess;
  //   this.model.parkingLocation = this.model.parkingLocation === null ? ParkingEnum.defaultDropdownSelection : this.model.parkingLocation;
  //   this.model.parkingCondition = this.model.parkingCondition === null ? ParkingEnum.defaultDropdownSelection : this.model.parkingCondition;
  //   this.model.parkingPrice = this.model.parkingPrice === null ? ParkingEnum.defaultDropdownSelection : this.model.parkingPrice;
  // }

}
