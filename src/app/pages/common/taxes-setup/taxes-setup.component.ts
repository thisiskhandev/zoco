import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TaxesSetupEnum } from './shared/taxes-setup-enum';
import { TaxesSetupModel } from './shared/taxes-setup-model';
import { GenericModel } from '@shared/generic-model';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';
import { TaxesSetupService } from '@commons/taxes-setup/shared/taxes-setup.service';

@Component({
  selector: 'app-taxes-setup',
  templateUrl: './taxes-setup.component.html',
  styleUrls: ['./taxes-setup.component.css']
})
export class TaxesSetupComponent extends AbstractGenericFormComponent implements OnInit {

  @Input() model : TaxesSetupModel;
  taxesSetupEnum = TaxesSetupEnum;
  percentageOptions : Array<GenericModel>;

  constructor(private formBuilder: FormBuilder, private service : TaxesSetupService) {
    super();
   }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.initEmptyForm(this.formBuilder);
    this.getPercentage();
  }

  getPercentage() {
    this.percentageOptions = [];
    this.service.getPercentaje().subscribe(data=> {
      data.forEach(element => {
        const object = element as GenericModel;
        this.percentageOptions.push(object);
      })
    });
  }

}
