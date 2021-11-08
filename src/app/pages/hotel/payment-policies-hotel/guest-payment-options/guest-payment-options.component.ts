import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { GuestPaymentOptionsEnum } from './shared/guest-payment-options-enum';
import { GuestPaymentOptionsModel } from './shared/guest-payment-options-model';
import { GuestPaymentOptionsService } from './shared/guest-payment-options.service';
import { GenericModel } from '@shared/generic-model';
import { Utilities } from '@shared/utilities';
import { CustomValidator } from '@shared/customValidator';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';

@Component({
  selector: 'app-guest-payment-options',
  templateUrl: './guest-payment-options.component.html',
  styleUrls: ['./guest-payment-options.component.css'],
  providers: [ GuestPaymentOptionsService ]
})
export class GuestPaymentOptionsComponent extends AbstractGenericFormComponent implements OnInit, OnChanges {

  @Input() establishmentId: number;
  @Input() model : GuestPaymentOptionsModel;
  cardsTypes: Array <GenericModel>;
  requiredField : string = Utilities.falseString;
  guestPaymentOptionsEnum = GuestPaymentOptionsEnum;

  constructor(private formBuilder: FormBuilder, 
    private guestPaymentOptionsService: GuestPaymentOptionsService) {
    super();
   }

   ngOnInit() {
      this.getCreditCardTypeDropdownOptions();
      this.initForm();    
  }

  initForm(): void {
    let group = [];

    if(this.cardsTypes) {
      this.cardsTypes.forEach((data) => {
        let value = (this.model.creditCardTypes.indexOf(data.id) != GuestPaymentOptionsEnum.negativeValue);
        group.push(new FormGroup({
          id: new FormControl(data.id),
          name: new FormControl(data.name),
          image_path: new FormControl(data.image_path),
          checked: new FormControl(value),
        }));
      });

      let formControlArray = new FormArray(group);
     
      let validator = (this.requiredField == Utilities.trueString ? Validators.required : null);
      this.formGroup = new FormGroup({
          chargeToYourCreditCard: new FormControl( this.model.chargeToYourCreditCard),
          cardsTypes: formControlArray,
          formSelectedItems: new FormControl(this.mapItems(formControlArray.value), validator)
      });
          
      formControlArray.valueChanges.subscribe((data) => {
        this.formGroup.controls.formSelectedItems.setValue(this.mapItems(data));
      });  
    }
  }

  mapItems(items) {
    while(this.model.creditCardTypes.length > GuestPaymentOptionsEnum.valueZero) {
      this.model.creditCardTypes.pop();
    }

    items.filter(
      (data) => data.checked).map(
        (data) => data.id
      ).forEach(data =>
        this.model.creditCardTypes.push(data)
      );
      
    return this.model.creditCardTypes.length ? this.model : null;
  }

  get formData () {
    return <FormGroup>this.formGroup.controls.cardsTypes;
  }

  private getCreditCardTypeDropdownOptions(): void {
    this.cardsTypes = [];
    this.guestPaymentOptionsService.getCreditCardsTypes().subscribe((data:any) => {
      data.data.forEach( ( creditCardType ) => {
        let creditCreditCardTypeModel = new GenericModel();
        creditCreditCardTypeModel.id = creditCardType.id;
        creditCreditCardTypeModel.name = creditCardType.name;
        creditCreditCardTypeModel.image_path = creditCardType.image_path;
        this.cardsTypes.push(creditCreditCardTypeModel);
      })
    });
  }

  clearChargeToYourCreditCard(event): void {
    if(event.value === Utilities.trueString ) {
      this.requiredField = Utilities.trueString;
    }
    else {
      this.requiredField = Utilities.falseString;
    }

    this.initForm();
  }

  onSubmit() {
    if(this.model.chargeToYourCreditCard === Utilities.falseString)
      this.model.creditCardTypes = [];
  }

  ngOnChanges(changes: SimpleChanges){
    for (let name in changes) {
      if (name == GuestPaymentOptionsEnum.model) {
        this.initForm();
      }
    }
  }
    
}
