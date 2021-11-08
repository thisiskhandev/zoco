import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ExtraBedEnum } from './shared/extra-bed-enum';
import { FormBuilder } from '@angular/forms';
import { ExtraBedModel } from './shared/extra-bed-model';
import { GenericModel } from '@shared/generic-model';
import { ExtraBedService } from './shared/extra-bed.service';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';
import { Utilities } from '@shared/utilities';

@Component({
  selector: 'app-extra-bed',
  templateUrl: './extra-bed.component.html',
  styleUrls: ['./extra-bed.component.css']
})
export class ExtraBedComponent extends AbstractGenericFormComponent implements OnInit, OnChanges {

  @Input() model : ExtraBedModel;
  extraBedEnum = ExtraBedEnum;
  extraBedQuantity = [1, 2, 3, 4];
  childrenAgesOptions: Array <GenericModel>;
  haveCrib : boolean = false;
  haveChil : boolean = false;
  haveAdul : boolean = false;
  
  constructor(private formBuilder: FormBuilder, private extraBedService : ExtraBedService) { 
    super();
    this.initForm();
  }

  ngOnInit() {
  }

  initForm() {
    this.getChildrenAges();
    this.initEmptyForm(this.formBuilder);
  }

  getChildrenAges() : void {
    this.childrenAgesOptions = [];
    this.extraBedService.getChildrenAges().subscribe (data=>
      { data.data.forEach(element => {
        const data = new GenericModel();
        if(data) {
          data.id = element.index;
          data.desc = element.value;
          this.childrenAgesOptions.push(data);
        }
        });
      }
    );
  }

  onChange(id : number) {
    switch(id) {
      case ExtraBedEnum.guestExtraBedsCotId: this.model.haveChildrenInCribs = this.haveCrib.toString();
          break;
      case ExtraBedEnum.guestExtraBedsChildrenId: this.model.haveChildren = this.haveChil.toString();
          break;
      case ExtraBedEnum.guestExtraBedsAdultId: this.model.haveAdults = this.haveAdul.toString();
          break;
    }
    this.model.adultPrice = this.haveAdul == false ? null : this.model.adultPrice; 
    this.model.childrenAges = this.haveChil == false ? null : this.model.childrenAges
    this.model.childrenPrice = this.haveChil == false ? null : this.model.childrenPrice;
    this.model.childCribsPrice = this.haveCrib == false ? null : this.model.childCribsPrice;
  }

  clearModel(event) {
    if(event.value === Utilities.falseString) {
      this.model.childrenAges =  this.model.childrenPrice = this.model.childCribsPrice = this.model.adultPrice = null ; 
      this.model.haveChildren = this.model.haveChildrenInCribs = this.model.haveAdults = Utilities.falseString;
    }
  }

  ngOnChanges(changes: SimpleChanges){
    for (let name in changes) {
      if(name == ExtraBedEnum.model && this.model.hasExtraBed == Utilities.trueString) {
        this.haveAdul = (this.model.haveAdults == Utilities.trueString);
        this.haveChil = (this.model.haveChildren == Utilities.trueString);
        this.haveCrib = (this.model.haveChildrenInCribs == Utilities.trueString);
      }
    }
  }

}
