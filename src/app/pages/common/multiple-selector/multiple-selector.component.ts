import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MultipleSelectorEnum } from './shared/multiple-selector-enum';
import { GenericModel } from '@shared/generic-model';
import { FormArray, FormBuilder, FormControl, Validators, FormGroup, NgForm } from '@angular/forms';
import { Utilities } from '@shared/utilities';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';

@Component({
  selector: 'app-multiple-selector',
  templateUrl: './multiple-selector.component.html',
  styleUrls: ['./multiple-selector.component.css']
})
export class MultipleSelectorComponent extends AbstractGenericFormComponent implements OnInit, OnChanges {

  @Input() model : Array<Number> = [];
  @Input() itemsTypes: Array <GenericModel>;
  @Input() requiredField: string = Utilities.falseString;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
  }

  initForm() {
    let group = [];

    if(this.itemsTypes) {
      this.itemsTypes.forEach((data) => {
        let value = (this.model.indexOf(data.id) != MultipleSelectorEnum.negative);
        group.push(new FormGroup({
          id: new FormControl(data.id),
          name: new FormControl(data.name),
          checked: new FormControl(value),
        }));
      });

      let formControlArray = new FormArray(group);
     
      let validator = (this.requiredField == Utilities.trueString ? Validators.required : null);
      this.formGroup = new FormGroup({
          itemsTypes: formControlArray,
          formSelectedItems: new FormControl(this.mapItems(formControlArray.value), validator)
      });
          
      formControlArray.valueChanges.subscribe((data) => {
        this.formGroup.controls.formSelectedItems.setValue(this.mapItems(data));
      });  
    }
  }

  mapItems(items) {
    while(this.model.length > MultipleSelectorEnum.valueZero) {
      this.model.pop();
    }

    items.filter(
      (data) => data.checked).map(
        (data) => data.id
      ).forEach(data =>
        this.model.push(data)
      );
      
    return this.model.length ? this.model : null;
  }

  setModel(model) {
    this.model = model;
    this.initForm();
  }
  
  onSubmit() {
  }

  transformGroupToModel() {
  }

  get formData () {
    return <FormGroup>this.formGroup.controls.itemsTypes;
  }
  
  ngOnChanges(changes: SimpleChanges){
    for (let name in changes) {
      if(name == MultipleSelectorEnum.itemsList || (name == MultipleSelectorEnum.model && this.model.length > MultipleSelectorEnum.valueZero) ) {
        this.initForm();
      }
    }
  }
  
}
