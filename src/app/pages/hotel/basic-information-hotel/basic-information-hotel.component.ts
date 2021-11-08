import { HotelService } from "../shared/hotel.service";
import { OnInit, ViewChild, Component, Output, EventEmitter, Input, SimpleChanges, AfterViewInit, OnChanges } from "@angular/core";
import { BasicInformationEnum } from "./shared/basic-information-enum";
import { FormBuilder, FormArray, AbstractControl } from "@angular/forms";
//import { ToastyService, ToastyConfig } from "ng2-toasty";
import { BasicInformationHotel } from './shared/basic-information-hotel-model';
import { LocationComponent } from "./location/location.component";
import { PropertyComponent } from "./property/property.component";
import { ContactdetailComponent } from "./contactdetail/contactdetail.component";
import { ChannelmanagerComponent } from "./channelmanager/channelmanager.component";
import { Utilities } from "@shared/utilities";
import { CookieService } from 'ngx-cookie-service';
import { AbstractHotelGenericFormComponent } from '@hotel/shared/abstract-hotel-generic-form.component';
import { NavigatorEnum } from '../shared/navigator-enum';

import { LocationModel } from "./location/shared/location-model";
import { PropertyModel } from "./property/shared/property-model";
import { ContactDetailModel } from "./contactdetail/shared/contactdetail-model";
import { ChannelManagerModel } from "./channelmanager/shared/channelmanager-model";

@Component({
  selector: 'app-basic-information-hotel',
  templateUrl: './basic-information-hotel.component.html',
  styleUrls: ['./basic-information-hotel.component.css', './../shared/hotel.css'],
  providers: [ HotelService ]
})

export class BasicInformationHotelComponent extends AbstractHotelGenericFormComponent implements OnInit,  AfterViewInit, OnChanges  {

  BasicInformationEnum: typeof BasicInformationEnum = BasicInformationEnum;
  establishmentName: string;
  establishmentTotalRooms: number;
  basicInformationEnum = BasicInformationEnum;
  modelAux: BasicInformationHotel;
  id: number;

  @Output() notifyEstablishmentName: EventEmitter<string> = new EventEmitter<string>();
  @Output() notifyEstablishmentTotalRooms: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild(LocationComponent) location: any;
  @ViewChild(PropertyComponent) property: any;
  @ViewChild(ContactdetailComponent) contactDetail: any;
  @ViewChild(ChannelmanagerComponent) channelManager: any;


  propertyValid: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private hotelService: HotelService, 
    //public toastr:ToastyService, 
    //private toastyConfig: ToastyConfig,
    private cookieService: CookieService
  ) {
      super();
      //this.hotelService.toastr = //this.toastr;
   }

  ngOnInit() {

    this.id = undefined;
    
    this.viewChildComponentsStatus = new Array< boolean>();
  
    for(let i=0;i<BasicInformationEnum.childComponentQuantity;i++) {
      this.viewChildComponentsStatus.push(false);
    }

    this.model = new BasicInformationHotel();
    this.formGroup = this.formBuilder.group( {
      id: [this.model.id]
    });
    
  }

  ngAfterViewInit() {
    this.initForm();
  }


  initForm(): void {
    Utilities.log('BasicInformationHotelComponent - initForm');
    this.formGroup = this.formBuilder.group( {
    });

    if(this.location.formGroup) {
      this.formGroup.addControl(BasicInformationEnum.appLocationComponentName, this.location.formGroup);
      this.location.formGroup.setParent(this.formGroup);  
    }
      
    this.formGroup.addControl(BasicInformationEnum.appPropertyComponentName, this.property.formGroup);
    this.property.formGroup.setParent(this.formGroup);
    this.formGroup.addControl(BasicInformationEnum.appContactDetailComponentName, this.contactDetail.formGroup);
    this.contactDetail.formGroup.setParent(this.formGroup);
    // this.formGroup.addControl(BasicInformationEnum.appChannelManagerComponentName, this.channelManager.formGroup);
    // this.channelManager.formGroup.setParent(this.formGroup);

  }


  async onSubmit() {

    this.modelAux = new BasicInformationHotel();

    this.location.onSubmit();
    this.property.onSubmit();
    this.contactDetail.onSubmit();
    //this.channelManager.onSubmit();

    await this.transformGroupToModel();

    let result = this.hotelService.saveBasicInfo(this.model);
    result.then(res => { this.model.id = res.id})
    
    return result;
  }

  deleteAllModel(modelToDelete: LocationModel | ContactDetailModel | ChannelManagerModel | PropertyModel): void {
    for(let prop in modelToDelete)
      if(this.modelAux.hasOwnProperty(prop))
        delete this.modelAux[prop];
  }

  async getUsedProperties(model: LocationModel | ContactDetailModel | PropertyModel, modelAux: LocationModel | ContactDetailModel | PropertyModel): Promise<void> {

    if(Object.entries(model).length != 0) {
      this.id = model.id;

      for (let prop in modelAux) 
        if (model.hasOwnProperty(prop)) 
          this.modelAux[prop] = model[prop];
        else 
          delete this.modelAux[prop];
    } 
    else {
      await this.deleteAllModel(modelAux);
    }
  }

  async transformGroupToModel(): Promise<void> {

    await this.getUsedProperties(this.location.model, this.location.modelAux);

    await this.getUsedProperties(this.property.model, this.property.modelAux);

    this.contactDetail.modelAux = new ContactDetailModel();

    await this.getUsedProperties(this.contactDetail.model, this.contactDetail.modelAux);

    await this.setDefaultProperties();

    //await this.getUsedProperties(this.channelManager.model, this.channelManager.modelAux);

    this.modelAux.id = this.id;

    this.model = this.modelAux;
  }

  setDefaultProperties(): void {
    for(let prefix of this.contactDetail.prefix) {
      let attribute: string = `${prefix}_different_address`;

      if(this.contactDetail.model.hasOwnProperty(attribute)) {
        if(this.contactDetail.model[attribute] === "false") {
          let modelProperties: Array<string> = [`${prefix}_home_address`, `${prefix}_country`, `${prefix}_state`, `${prefix}_city`, `${prefix}_zip`];
  
          for(let property of modelProperties) {
            let locationProperty: string = property.replace(`${prefix}_`, "");
  
            if(locationProperty === "zip") {
              locationProperty = "zipCode";
            }
            
            this.modelAux[property] = this.location.model[locationProperty];
          }
        }
      }
    }
  }


/*
  transformGroupToModel(): void {

    C

    for (var prop in this.property.model) {
      if (this.property.model.hasOwnProperty(prop)) {
        this.model[prop]=this.property.model[prop];
      }
    }

    for (var prop in this.contactDetail.model) {
      if (this.contactDetail.model.hasOwnProperty(prop)) {
        this.model[prop]=this.contactDetail.model[prop];
      }
    }

    for (var prop in this.channelManager.model) {
      if (this.channelManager.model.hasOwnProperty(prop)) {
        this.model[prop]=this.channelManager.model[prop];
      }
    }

  }
*/
  
  onNotifyEstablishmentName(hotelName: string): void {
    this.establishmentName = hotelName;
    this.notifyEstablishmentName.emit(this.establishmentName);
  }

  onNotifyEstablishmentTotalRooms(establishmentTotalRooms: number): void {
    Utilities.log('muto total de cuartos - basic info');
    this.establishmentTotalRooms = establishmentTotalRooms;
    this.notifyEstablishmentTotalRooms.emit(this.establishmentTotalRooms);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let name in changes) {
      if(name == NavigatorEnum.hotelCompleteInfoVariableName && this.hotelCompleteInfo !== undefined) {
        Utilities.log('basic-info - onchanges');
        this.model.setData(this.hotelCompleteInfo);
        this.initForm();
        break;
      }
    }
  }


}
