import { Component, OnInit, Input } from '@angular/core';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';
import { ExtraChargesEnum } from './shared/extra-charges-enum';
import { FormBuilder } from '@angular/forms';
import { ExtraChargesModel } from './shared/extra-charges-model';
import { GenericModel } from '@shared/generic-model';
import { ExtraChargesService } from './shared/extra-charges.service';
import { Utilities } from '@shared/utilities';

@Component({
  selector: 'app-extra-charges',
  templateUrl: './extra-charges.component.html',
  styleUrls: ['./extra-charges.component.css']
})
export class ExtraChargesComponent extends AbstractGenericFormComponent implements OnInit {

  @Input() model : ExtraChargesModel;
  extraChargesEnum = ExtraChargesEnum;
  extraChargesOptions : Array<GenericModel>;
  requiredField : string = Utilities.falseString;

  constructor(private formBuilder: FormBuilder, private service: ExtraChargesService) {
    super();
   }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.initEmptyForm(this.formBuilder);
    this.getExtraCharges();
  }

  getExtraCharges() : void {
    this.extraChargesOptions = [];
    this.service.getExtraCharges().subscribe(data => 
      {data.data.forEach(type => {
        const element = new GenericModel();
        element.id = type.id;
        element.name = type.name;
        this.extraChargesOptions.push(type);
      })}
    );
  }

}
