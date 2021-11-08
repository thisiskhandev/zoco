import { Component, OnInit } from '@angular/core';
import { ChannelManagerModel } from './shared/channelmanager-model';
import { ChannelManagerEnum } from './shared/channelmanager-enum';
import { FormBuilder, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Utilities } from '@shared/utilities';
import { BasicInformationEnum } from '../shared/basic-information-enum';
import { AbstractHotelGenericFormComponent } from '@hotel/shared/abstract-hotel-generic-form.component';

@Component({
  selector: 'app-channelmanager',
  templateUrl: './channelmanager.component.html',
  styleUrls: ['./channelmanager.component.css', './../../shared/hotel.css']
})
export class ChannelmanagerComponent extends AbstractHotelGenericFormComponent implements OnInit {

  BasicInformationEnum: typeof BasicInformationEnum = BasicInformationEnum;
  ChannelManagerEnum: typeof ChannelManagerEnum = ChannelManagerEnum;
  modelAux: ChannelManagerModel;

  constructor(private formBuilder: FormBuilder) {
    super();
    this.model = new ChannelManagerModel();
    this.initForm();    
   }

  ngOnInit() {
  }

  initForm() {
    this.formGroup = this.formBuilder.group( {
      haveChannelManager: [this.model.haveChannelManager, Validators.required],
      channelManagerName: [this.model.channelManagerName]
    });
    this.setValueChangeListener();   
    this.isValid.emit(this.formGroup.valid);
  }

  onSubmit() {
    this.modelAux = new ChannelManagerModel();

    this.transformGroupToModel();
  }

  transformGroupToModel(): void {

    if( (this.formGroup.valid) && (this.formGroup.dirty) ) {

      let formField: AbstractControl;
      
      for(let attribute in this.modelAux) {
        formField = this.formGroup.get(attribute) as FormArray;
  
        if(formField.dirty) {
          this.model[attribute] = formField.value;
          
          // The control is reset to put "dirty = false", while preserving the initial value
          formField.reset();
          formField.setValue(this.model[attribute]);
          this.formGroup.setControl(attribute, formField);
        }
        else if( (!formField.dirty) && (formField.value != "geo_coordinates") ) {
          delete this.model[attribute];
        }
      }
    } else {
      this.model = {};

      console.log("Invalid form or has not been modified. CHANNEL MANAGER");
      console.log(this.formGroup);
    }
  }

  /*transformGroupToModel() {
    let hotelAttribute = this.formGroup.get(ChannelManagerEnum.haveChannelManager)  as FormArray;
    this.model.haveChannelManager = hotelAttribute.value;  

    hotelAttribute = this.formGroup.get(ChannelManagerEnum.channelManagerName)  as FormArray;
    this.model.channelManagerName = hotelAttribute.value;

  }*/

  clearChannelManager(): void {
    let hotelAttribute = this.formGroup.get(ChannelManagerEnum.haveChannelManager)  as FormArray;
    let testValue = hotelAttribute.value;
    if(testValue === Utilities.trueString) {
      this.formGroup.addControl(ChannelManagerEnum.channelManagerName, new FormControl({value: BasicInformationEnum.emptyString}, Validators.compose([ Validators.required,
        Validators.maxLength(BasicInformationEnum.inputMaxSize)])));
    } else {
      this.formGroup.removeControl(ChannelManagerEnum.channelManagerName);
      this.formGroup.addControl(ChannelManagerEnum.channelManagerName, 
          new FormControl(BasicInformationEnum.emptyString));
    }
  }

}
