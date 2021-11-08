import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, NgForm  } from '@angular/forms';
import { GenericModel } from '@shared/generic-model';
import { LanguageEnum } from './shared/language-enum';
import { LanguageService } from './shared/language.service';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';
import { Utilities } from '@shared/utilities';
import { MultipleSelectorComponent } from '@commons/multiple-selector/multiple-selector.component';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent extends AbstractGenericFormComponent implements OnInit {

  @Input() model: Array<Number> = [];
  languageOptions: Array<GenericModel>;
  requiredField : string = Utilities.trueString; 
  languageEnum = LanguageEnum;
  
  @ViewChild(MultipleSelectorComponent) multipleSelectorComponent: any;

  constructor(private formBuilder: FormBuilder,
    private languageService: LanguageService) { 
      super();
      this.initForm();      
    }
    
  ngOnInit() {
    this.getLanguageOptions();
  }

  initForm(): void {
    this.initEmptyForm(this.formBuilder);
  }

  getLanguageOptions(): void {
    this.languageOptions = [];
    this.languageService.getLanguages().subscribe((data:any) => {
      data.data.forEach(language => {
        const languageModel = language as GenericModel;
        languageModel.id = language.id;
        languageModel.name = language.lang_description;
        this.languageOptions.push(languageModel);
      })
    });
  }

  setModel(model : any) {
    this.model = model;
    this.multipleSelectorComponent.setModel(model);
  }
  
}
