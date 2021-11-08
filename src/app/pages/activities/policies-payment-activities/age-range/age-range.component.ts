import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AgeRangeEnum } from './shared/age-range-enum';
import { AgeRangeModel } from './shared/age-range-model';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';

@Component({
  selector: 'app-age-range',
  templateUrl: './age-range.component.html',
  styleUrls: ['./age-range.component.css']
})
export class AgeRangeComponent extends AbstractGenericFormComponent implements OnInit {

  @Input() model : AgeRangeModel;
  ageRangeEnum = AgeRangeEnum;
  infantOptions: number [];
  childrenOptions: number [];
  adultOptions: number [];

  constructor(private formBuilder: FormBuilder) {
    super();
   }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.initEmptyForm(this.formBuilder);
    this.infantVector();
    this.childrenVector();
    this.adultVector();
  }

  infantVector() {
    this.infantOptions = [];
    for (let i=Number(AgeRangeEnum.zero); i<=AgeRangeEnum.six; i++)
      this.infantOptions.push(i);
  }

  childrenVector() {
    this.childrenOptions = [];
    for (let i=Number(AgeRangeEnum.one); i<=AgeRangeEnum.fifteen; i++)
      this.childrenOptions.push(i);
  }

  adultVector() {
    this.adultOptions = [];
    for (let i=Number(AgeRangeEnum.ten); i<=AgeRangeEnum.eighteen; i++)
      this.adultOptions.push(i);
  }
 
}
