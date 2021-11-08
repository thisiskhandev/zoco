import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { InternetEnum } from './shared/internet-enum'; 
import { InternetModel } from './shared/internet-model';
import { GenericModel } from '@shared/generic-model';
import { InternetService } from './shared/internet.service';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';
import { FormBuilder, FormArray, Validators, FormControl, AbstractControl, FormGroup } from '@angular/forms';
import { Utilities } from '@shared/utilities';

@Component({
  selector: 'app-internet',
  templateUrl: './internet.component.html',
  styleUrls: ['./internet.component.css', './../../shared/hotel.css']
})
export class InternetComponent extends AbstractGenericFormComponent implements OnInit, OnChanges {

  @Input() model: InternetModel;
  hasInternetOptions: Array <any>;
  internetEnum = InternetEnum;
  internetConnectTypes: Array <GenericModel>;
  internetPlacesList: Array <GenericModel>;
  modelAux: any;
  formGroupInternet: FormGroup;
  isInit: boolean = false;

  constructor( private formBuilder: FormBuilder, private internetService: InternetService ) { 
    super();
  }

  ngOnInit() {
    this.initForm();
    this.initFormGroup();
  }

  initForm() {
    this.initEmptyForm(this.formBuilder);
    this.getInternetConnectType();
    this.getInternetPlaces();
  }

  ngOnChanges() {
    if((this.modelExists()) && (!this.isInit)) {
      this.initFormGroup();
      this.isInit = true;
    }
    else {
      Utilities.log("The internet model doesn't exists");
    }
    
  }

  modelExists(): boolean {
    for(let property in this.model)
      if( this.model[property] )
        return true
    
    return false;
  }

  initFormGroup(): void {
    this.formGroupInternet = this.formBuilder.group( {
      hasInternet: [this.model.hasInternet, Validators.required],
      payInternet: [this.model.payInternet, Validators.required],
      internetPrice: [this.model.internetPrice, [ Validators.required, Validators.maxLength(this.internetEnum.internetPriceInputMaxSize), Validators.pattern('0*[1-9][0-9]*$')]],
      internetConnectType: [this.model.internetConnectType, Validators.required],
      internetPlaces: [this.model.internetPlaces, Validators.required]
    })
    this.setValueChangeListener();   
    this.isValid.emit(this.formGroupInternet.valid);
  }
  
  getInternetConnectType(): void {
    this.internetConnectTypes = [];

    this.internetService.getInternetType().subscribe(data => {
      data.data.forEach(internetConnectType => {
        const internetTypeModel = internetConnectType as GenericModel;
        this.internetConnectTypes.push(internetTypeModel);
      })
    });
  }
  
  getInternetPlaces(): void {
    this.internetPlacesList = [];

    this.internetService.getInternetPlaces().subscribe(data => {
      data.data.forEach(internetPlace => {
        const internetPlacesModel = internetPlace as GenericModel;
        this.internetPlacesList.push(internetPlacesModel);
      });
    }); 
  }

  clearModel(): void {
    switch(this.model.hasInternet) {
      case InternetEnum.noInternet: {
        this.model.internetConnectType = this.model.internetPlaces = this.model.internetPrice = null;
        break;
      }     
      case InternetEnum.internetFree: {
        this.model.internetPrice = null;
        break;
      }
    }
  }

  resetFormField(formField: AbstractControl, control: string): void {
    formField.reset();
    formField.setValue(this.modelAux[control]);
    this.formGroupInternet.setControl(control, formField);  
  }

  transformGroupToModel(): void {
    
    if(this.formGroupInternet.dirty) {
      let formField: AbstractControl;
      delete this.model.id;
      delete this.modelAux.id;

      for(let attribute in this.model) {
          formField = this.formGroupInternet.get(attribute) as FormArray;

          if(formField.dirty) {

            this.modelAux[attribute] = formField.value;
            this.resetFormField(formField, attribute);
          }
          else if(!formField.dirty) {
            delete this.modelAux[attribute];
          }
      }

      if(this.modelAux.hasOwnProperty("internetPrice"))
        this.modelAux.payInternet = "true";
      else {
        this.modelAux.payInternet = "false";
        this.modelAux.internetPrice = "0";
      }
    } else {
      this.modelAux = {};
      Utilities.log("Invalid form or has not been modified. INTERNET");
    }
  }

  // transformGroupToModel(): void {
  //   this.model.internetConnectType = this.model.internetConnectType === null ? InternetEnum.defaultDropdownSelection : this.model.internetConnectType;
  //   this.model.internetPlaces = this.model.internetPlaces === null ? InternetEnum.defaultDropdownSelection : this.model.internetPlaces;
  //   this.model.internetPrice = this.model.internetPrice === null ? InternetEnum.defaultDropdownSelection : this.model.internetPrice;
  // }

  // checkIfInternetIsValid(): void {
  //    if(this.formGroupInternet.get('hasInternet').value === Utilities.emptyLengthString)
  //     this.transformGroupToModel()  
    
  // }

  onSubmit() {
    // this.checkIfInternetIsValid();

    this.modelAux = this.model = new InternetModel();

    this.transformGroupToModel();

    this.model = this.modelAux;

    return this.model;
  }
}

 /*
    "internet": {
        "hasInternet": "1",
        "payInternet": false,
        "internetPrice": 0,
        "internetConnectType": 1,
        "internetPlaces": 3
    },
  */