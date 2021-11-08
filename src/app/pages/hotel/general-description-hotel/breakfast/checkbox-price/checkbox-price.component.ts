import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';
import { FormArray, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { BreakfastList } from '@hotel/general-description-hotel/breakfast/shared/breakfast-list';
import { CustomValidator } from '@shared/customValidator';
import { BreakfastValidator } from '@hotel/general-description-hotel/breakfast/shared/breakfast.validator';
import { GenericModel } from '@shared/generic-model';
import { BreakfastEnum } from '@hotel/general-description-hotel/breakfast/shared/breakfast-enum';

@Component({
  selector: 'app-checkbox-price',
  templateUrl: './checkbox-price.component.html',
  styleUrls: ['./checkbox-price.component.css','../../../shared/hotel.css']
})
export class CheckboxPriceComponent extends AbstractGenericFormComponent implements OnInit, OnChanges {

  @Input() breakfastOptions : Array<any>;
  @Input() model : Array<BreakfastList> = []; 
  @Input() typeBreakfast : number = BreakfastEnum.valueZero;
  breakfastEnum = BreakfastEnum;
  selectedBreakfastTypesForm = new FormArray([]);

  constructor(private formBuilder: FormBuilder) {
    super();
   }

  initForm() {
    this.initEmptyForm(this.formBuilder);
    this.isBreakFastAvailableDDOnchange();
    this.getBreakfastTypeDropdownOptions();
  }

  isBreakFastAvailableDDOnchange(): void {
    this.formGroup.removeControl(BreakfastEnum.breakfastPrice);
    this.formGroup.removeControl(BreakfastEnum.breakfastTypes);

    this.formGroup.addControl(BreakfastEnum.breakfastTypes, 
      this.formBuilder.array([],Validators.compose([BreakfastValidator.hasAnyBreakfastSelected]))
    );

    this.recreateBreakfastTypeFormGroup();
    this.fillBreakfastTypeFormArray();
  }

  getBreakfastTypeDropdownOptions() {
    for(let i = Number(BreakfastEnum.valueZero); i<this.breakfastOptions.length; i++) {
      let value = false, price = null, index = BreakfastEnum.negativeOne;
      
      if(this.model) {
        let item = this.model.find(this.findIndexToUpdate, this.breakfastOptions[i].id);
        value = (this.model.indexOf(item) != BreakfastEnum.negativeOne);
        index = this.model.indexOf(item);
      }
      if( value )
        price = this.model[index].price;

      this.selectedBreakfastTypesForm.push(this.formBuilder.group({
        breakfastType: [value],
        breakfastPrice: [price,
          this.doesHavePaidBreakfast() 
          ? Validators.compose([CustomValidator.onlyNumberValidator, CustomValidator.valueGreaterZeroValidator ])
          : Validators.compose([])
        ]
      },
      {
        validator: [BreakfastValidator.checkIsPriceNeeded.bind(this)]
      }));     
    }
  }

  findIndexToUpdate(data) { 
    return data.id === this;
  }

  doesHavePaidBreakfast() {
    return this.typeBreakfast == BreakfastEnum.yesPaidId ? true : false;
  }

  ngOnInit() {
  }

  getBreakfastTypesFormArray(): FormArray {
    return this.formGroup.get(BreakfastEnum.breakfastTypes) as FormArray;
  };

  private recreateBreakfastTypeFormGroup(): void {
    const doesHavePaidBreakfast = this.doesHavePaidBreakfast() ;
    this.selectedBreakfastTypesForm = new FormArray([]);
    this.breakfastOptions.forEach(bt => {      
      let value = false, price = null, index = BreakfastEnum.negativeOne;
      if(this.model) {
        let item = this.model.find(this.findIndexToUpdate, bt.id);
        value = (this.model.indexOf(item) != BreakfastEnum.negativeOne);
        index = this.model.indexOf(item);
      }
      if(value)
        price = this.model[ index ].price;

      this.selectedBreakfastTypesForm.push(this.formBuilder.group({
        breakfastType: [value],
        breakfastPrice: [price,
          doesHavePaidBreakfast
          ? Validators.compose([CustomValidator.onlyNumberValidator, CustomValidator.valueGreaterZeroValidator])
          : Validators.compose([])
        ]
      },
      doesHavePaidBreakfast
      ?{ validator: [BreakfastValidator.checkIsPriceNeeded.bind(this)] }
      : {}
      ));
    });
  }

  private fillBreakfastTypeFormArray() {
    let breakfastTypesFormArray = this.formGroup.get(BreakfastEnum.breakfastTypes) as FormArray;

    if (breakfastTypesFormArray.length >  BreakfastEnum.valueZero ) {
      breakfastTypesFormArray = this.formBuilder.array([],
        Validators.compose([CustomValidator.hasAnySelected ]));
    }
    
    this.selectedBreakfastTypesForm.controls.forEach(breakfastTypesForm => {
        breakfastTypesFormArray.push(breakfastTypesForm);
    });
  }

  isBreakFastChecked(index: number): boolean {
    return this.getBreakfastTypesFormArray().controls[index].get(BreakfastEnum.breakfastType).value;
  }

  onSubmit() {
    this.transformGroupToModel();
  }

  resetFormField(formField: AbstractControl, control: string): void {
    let value = formField.value;

    formField.reset();
    formField.setValue(value);
    this.formGroup.setControl(control, formField);  
  }

  transformGroupToModel(): void {
    let price: number = BreakfastEnum.valueZero;
    const doesHavePaidBreakfast: boolean = this.doesHavePaidBreakfast();

    if(this.model) {
      while(this.model.length > BreakfastEnum.valueZero ) {
        this.model.pop();
      }
    }

    if(this.formGroup.dirty) {
      let attribute = this.formGroup.get(BreakfastEnum.breakfastTypes)  as FormArray;
  
      attribute.value.forEach((breakfastTypeForm, index) => {         
        let list = new BreakfastList();  
        list.id = this.breakfastOptions[index].id;
        list.price = doesHavePaidBreakfast  
            ? this.getBreakfastTypesFormArray().controls[index].get(BreakfastEnum.breakfastPrice).value 
            : BreakfastEnum.valueZero;
  
        if(breakfastTypeForm.breakfastType)
          this.model.push(list);
      })
      this.resetFormField(attribute, BreakfastEnum.breakfastTypes);
    }
  }

  ngOnChanges(changes: SimpleChanges){
    for (let name in changes) {
      if( name == BreakfastEnum.model || name == BreakfastEnum.typeBreakfast ) {
        this.initForm();
      }
    }
  }

}
