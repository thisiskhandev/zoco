import { Component, OnInit, Input } from '@angular/core';
import { ExcludeTaxesEnum } from './shared/exclude-taxes-enum';
import { GenericModel } from '@shared/generic-model';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ExcludeTaxesService } from './shared/exclude-taxes.service';
import { ExcludeTaxesModel } from './shared/exclude-taxes-model';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';
import { Utilities } from '@shared/utilities';

@Component({
  selector: 'app-exclude-taxes',
  templateUrl: './exclude-taxes.component.html',
  styleUrls: ['./exclude-taxes.component.css']
})
export class ExcludeTaxesComponent extends AbstractGenericFormComponent implements OnInit {

  @Input() model : ExcludeTaxesModel;
  excludeTaxesEnum = ExcludeTaxesEnum;
  typeTaxOptions : Array<GenericModel>;
  requiredField : string = Utilities.trueString;

  constructor(private formBuilder: FormBuilder, private service : ExcludeTaxesService) { 
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.initEmptyForm(this.formBuilder);
    this.getTypeTax();
  }

  getTypeTax() : void {
    this.typeTaxOptions = [];
    this.service.getTaxes().subscribe(data => 
      {data.forEach(type => {
        this.typeTaxOptions.push(type);
        })
      }
    );
  }

}
