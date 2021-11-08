import { Component, OnInit, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { PropertyEnum } from './shared/property-enum';
import { FormArray, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { StablishmentType } from '../shared/stablishment-type-model';
import { HotelService } from '../../shared/hotel.service';
import { BasicInformationValidator } from '../shared/basic-information-validator';
import { CustomValidator } from '@shared/customValidator';
import { Utilities } from '@shared/utilities';
import { PropertyModel } from './shared/property-model';
import { BasicInformationEnum } from '../shared/basic-information-enum';
import { AbstractHotelGenericFormComponent } from '@hotel/shared/abstract-hotel-generic-form.component';
import { NavigatorEnum } from '@hotel/shared/navigator-enum';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css', './../../shared/hotel.css'],
  providers: [ HotelService ]
})
export class PropertyComponent extends AbstractHotelGenericFormComponent implements OnInit, OnChanges {
  BasicInformationEnum: typeof BasicInformationEnum = BasicInformationEnum;
  PropertyEnum: typeof PropertyEnum = PropertyEnum;
  stablishmentTypes: Array<StablishmentType>;
  customerTypes: Array<StablishmentType>;
  selectedCustomerTypeForm = new FormArray([]);

  modelAux: PropertyModel;

  @Output() notifyEstablishmentName: EventEmitter<string> = new EventEmitter<string>();
  @Output() notifyEstablishmentTotalRooms: EventEmitter<number> = new EventEmitter<number>();

  constructor(private formBuilder: FormBuilder,
    private hotelService: HotelService) { 
    super();
    this.model = new PropertyModel();
    this.initForm();
  }

  ngOnInit() {
  }

  initForm() {
    this.getStablishmentTypes();
    //this.getCustomerTypes();

    this.formGroup = this.formBuilder.group( {
      establishmentType: [this.model.establishmentType, Validators.compose([Validators.required])], 
      haveStarRating: [this.model.haveStarRating, Validators.required],
      star_rating: [this.model.star_rating]
    });
    
    this.setValueChangeListener();   
    this.isValid.emit(this.formGroup.valid);
    
  }

  onSubmit(): void {
    this.modelAux = new PropertyModel();

    this.transformGroupToModel();
  }

  // The control is reset to put "dirty = false", while preserving the initial value
  resetFormField(formField: AbstractControl, control: string): void {
    let customerTypesArray: Array<boolean> = formField.value;

    formField.reset();
    formField.setValue(customerTypesArray);
    this.formGroup.setControl(control, formField);

  }

  pushArrayInModel(formField: AbstractControl, control: string): void {

    this.model[control] = [];
    
    for(let i = 0; i < formField.value.length; i++)
        this.model[control].push(formField.value[i]);
  }
  transformGroupToModel(): void {

    if(this.formGroup.valid) {

      let formField: AbstractControl;

      for(let attribute in this.modelAux) {
        formField = this.formGroup.get(attribute) as FormArray;

        if(formField.dirty) {

          if(typeof formField.value != "object") {
            this.model[attribute] = formField.value;
          }
          else if( Array.isArray(formField.value) ) {
            this.pushArrayInModel(formField, attribute);
          }
          
          this.resetFormField(formField, attribute);
        }
        else {
          delete this.model[attribute];
        }
      }
      
      if( ( this.model.hasOwnProperty("establishmentType") ) && (this.model["establishmentType"] != "11") ) {
        this.model["starRating"] = 0;
        this.model["haveStarRating"] = "false";
      }  
    } 
    else if(!this.formGroup.dirty) {
      this.model = {};

      console.log("Invalid form or has not been modified. PROPERTY");
      console.log(this.formGroup);
    }
  }

  getStablishmentTypes(): void {
    this.stablishmentTypes = [];
    this.hotelService.getStablishmentType().subscribe((data:any) => 
      data.data.forEach(establishmentType => {
        const stablishmentTypeModel = establishmentType as StablishmentType;
        this.stablishmentTypes.push(stablishmentTypeModel);
      })
    );
  }

  onStablishmenteChangeEvent(val: string) {
    this.notifyEstablishmentName.emit(val);
  }

  onEstablishmentTotalRoomsChangeEvent(val: number) {

    this.notifyEstablishmentTotalRooms.emit(val);
  }

  emitDataChange(): void {
    let hotelAttribute = this.formGroup.get(PropertyEnum.numberOfRooms)  as FormArray;

    console.log("hotelAttribute");
    console.log("hotelAttribute");
    console.log("hotelAttribute");
    console.log("hotelAttribute");
    console.log(hotelAttribute);
    setTimeout(() => this.onEstablishmentTotalRoomsChangeEvent(Number(hotelAttribute.value)), NavigatorEnum.dialogTimeOut);
  }
  
  getEstablishmentTypeDescription(id: number): string {
    const property = this.stablishmentTypes.find(x => x.id === Number(id));
    return (property) ? property.property_description : '';
  }
  
  
  /*getCustomerTypes(): void {
    this.customerTypes = [];
    this.selectedCustomerTypeForm = new FormArray([]);
 

    this.hotelService.getCustomerTypes().subscribe((data:any) => {
        data.data.forEach(customerTypes => {
        const customerTypesModel = customerTypes as StablishmentType;
        this.customerTypes.push(customerTypes);
        let isSelected = (this.model.customerTypes !== undefined) && (this.model.customerTypes.find(x => x.id === customerTypesModel.id) !==  undefined)
        this.selectedCustomerTypeForm.push(new FormControl(isSelected ));
      }),
        this.fillCustomerTypeFormArray();      
      });
  }

  getCustomerTypesFormArray(): FormArray {
    return this.formGroup.get(PropertyEnum.customerTypes) as FormArray;
  };  

  private fillCustomerTypeFormArray() {
    this.formGroup.removeControl(PropertyEnum.customerTypes);
    this.formGroup.addControl(PropertyEnum.customerTypes,this.formBuilder.array([],Validators.compose([CustomValidator.hasAnySelected]))); 
    let customerTypesFormArray = this.formGroup.get(PropertyEnum.customerTypes) as FormArray;

    this.selectedCustomerTypeForm.controls.forEach(customerTypes => {
        customerTypesFormArray.push(
          customerTypes
        );
    });
  }*/
}
