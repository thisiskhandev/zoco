import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PaymentMethodsModel } from './shared/payment-methods-model';
import { PaymentMethodsEnum } from './shared/payment-methods-enum';
import { GenericModel } from '@shared/generic-model';
import { PaymentMethodsService } from './shared/payment-methods.service';
import { Utilities } from '@shared/utilities';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css']
})
export class PaymentMethodsComponent extends AbstractGenericFormComponent implements OnInit {

  @Input() model : PaymentMethodsModel
  paymentMethodsEnum = PaymentMethodsEnum;
  typeCardOptions : Array<GenericModel>;
  creditCardType : Array<GenericModel>;
  debitCardType : Array<GenericModel>;
  requiredField : string = Utilities.falseString;
  hasCreditCard : boolean = false;
  hasDebitCard : boolean = false;

  constructor(private formBuilder: FormBuilder, private service: PaymentMethodsService ) {
    super();
   }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.initEmptyForm(this.formBuilder);
    this.getCardType();
  }

  getCardType() {
    this.typeCardOptions = [];
    this.service.getCardTypes().subscribe((data:any) => {
      data.forEach(type => {
        this.typeCardOptions.push(type);
      }),
      this.getCreditCardType();
      this.getDebitCardType();
    });
  }

  getCreditCardType() : void {
    this.creditCardType = [];
    let id = this.findIndex(PaymentMethodsEnum.creditCard);
    
    this.service.getCards(id, PaymentMethodsEnum.getCreditCardsTypesErrorMessage).subscribe((data:any) => {
      data.data.forEach(type => {
        this.creditCardType.push(type);
      })  
    });
  }

  getDebitCardType() : void {
    this.debitCardType = [];
    let id = this.findIndex(PaymentMethodsEnum.debitCard);

    this.service.getCards(id, PaymentMethodsEnum.getDebitCardsTypesErrorMessage).subscribe((data:any) => {
      data.data.forEach(type => {
        this.debitCardType.push(type);
      })
    });
  }

  findIndex(cardType : string) {
    let item = this.typeCardOptions.find(this.findIndexToUpdate, cardType);
    return ( item.id );
  }

  findIndexToUpdate(data) { 
    return data.name == this;
  }

  acceptCreditCard(e) {
    this.model.acceptCreditCard = e.checked ? Utilities.trueString : Utilities.falseString;
  }

  acceptDebitCard(e) {
    this.model.acceptDebitCard = e.checked ? Utilities.trueString : Utilities.falseString;
  }

}
