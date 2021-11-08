import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { FeaturesEnum, DataFeaturesActivities } from './shared/features-enum';
import { Utilities } from '@shared/utilities';
import { FeaturesModel } from './shared/features-model';
import { GenericModel } from '@shared/generic-model';
import { LanguageComponent } from '@commons/language/language.component';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';
import { FeaturesService } from './shared/features.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent extends AbstractGenericFormComponent implements OnInit {

  @Input() model : FeaturesModel;
  @ViewChild (LanguageComponent) languageComponent;
  featuresEnum = FeaturesEnum;
  typeActivityOptions : Array<GenericModel>;
  locationOptions : Array<GenericModel>;

  constructor(private formBuilder: FormBuilder, private service : FeaturesService) {
    super();
   }

  ngOnInit() {
    this.initForm();
  }

  ngAfterViewInit() {
    this.formGroup.addControl(FeaturesEnum.language, this.languageComponent.formGroup);
    this.languageComponent.formGroup.setParent(this.formGroup);
  }

  initForm() {
    this.initEmptyForm(this.formBuilder);
    this.getActivities();
    this.getLocation();
  }

  getActivities(): void {
    this.typeActivityOptions = [];
    this.service.getActivities().subscribe(data => 
      {data.data.forEach(item => {
        const element = new GenericModel();
        element.id = item.id;
        element.name = item.name;
        this.typeActivityOptions.push(element);
        })
      }
    );
  }

  getLocation(): void {
    this.locationOptions = [];
    this.service.getLocation().subscribe(data => 
      {data.forEach(item => {
        const element = new GenericModel();
        element.id = item.id;
        element.name = item.name;
        this.locationOptions.push(element);
        })
      }
    );
  }

}
