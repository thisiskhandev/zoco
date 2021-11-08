import { Component, OnInit, Input, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, FormControlName, AbstractControl, Validators  } from '@angular/forms';
import { BreakfastModel } from './shared/breakfast-model';
import { BreakfastEnum } from './shared/breakfast-enum';
import { BreakfastValidator } from './shared/breakfast.validator';
import { GenericModel } from '@shared/generic-model';
import { CustomValidator } from '@shared/customValidator';
import { BreakfastService } from './shared/breakfast.service';
import { BreakfastList } from './shared/breakfast-list';
import { Utilities } from '@shared/utilities';
import { CheckboxPriceComponent } from '@hotel/general-description-hotel/breakfast/checkbox-price/checkbox-price.component';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';

@Component({
  selector: 'app-breakfast', 
  templateUrl: './breakfast.component.html',
  styleUrls: ['./breakfast.component.css','../../shared/hotel.css']
})
export class BreakfastComponent extends AbstractGenericFormComponent implements OnInit {

  @Input() model : BreakfastModel;
  @ViewChild(CheckboxPriceComponent) checkboxPriceComponent;
  breakfastEnum = BreakfastEnum;
  hasBreakfastDropdownOptions: Array<any>;
  breakfastTypeDropdownOptions: Array<GenericModel>;
  selectedBreakfastTypesForm = new FormArray([]);
  breakfastPriceInputMaxSize: number = BreakfastEnum.breakfastPriceInputMaxSize;

  constructor(private formBuilder: FormBuilder,
    private breakfastService: BreakfastService) { 
      super();
  }

  ngOnInit() {
    this.initEmptyForm(this.formBuilder);
    this.initForm();
  }

  initForm() {
    this.getBreakfastDropdownOptions();
    this.getBreakfastTypeDropdownOptions();
  }

  getBreakfastDropdownOptions() {
    this.hasBreakfastDropdownOptions = [
      {id: BreakfastEnum.noId, desc: BreakfastEnum.noDesc}, 
      {id: BreakfastEnum.yesFreeId, desc: BreakfastEnum.yesFreeDesc},
      {id: BreakfastEnum.yesPaidId, desc: BreakfastEnum.yesPaidDesc}
    ];
  }

  getBreakfastTypeDropdownOptions() {
    this.breakfastTypeDropdownOptions = [];
    this.breakfastService.getBreakfastTypes().subscribe((data:any) => {
      data.data.forEach(breakfastTypedata => {
        const breakfastTypeModel = breakfastTypedata as GenericModel;
        this.breakfastTypeDropdownOptions.push(breakfastTypeModel);
      });
    });
  }

  onSubmit() {
    this.checkboxPriceComponent.onSubmit();
  }
  
}
