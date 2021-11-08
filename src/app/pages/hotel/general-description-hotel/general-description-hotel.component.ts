import { Component, OnInit, ViewChild, AfterViewInit, ViewContainerRef, Input } from '@angular/core';
import { InternetComponent } from './internet/internet.component';
import { ParkingComponent } from './parking/parking.component';
import { BreakfastComponent } from './breakfast/breakfast.component';
import { LanguageComponent } from '@commons/language/language.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { GeneralDescriptionEnum } from './shared/general-description-enum';
import { GeneralDescriptionHotel } from './shared/general-description-hotel-model';
import { GeneralDescriptionHotelService } from './shared/general-description-hotel.service';
import { FormBuilder } from '@angular/forms';
import { AbstractGenericParentComponent } from '@shared/abstract-generic-parent.component';
import { Utilities } from '@shared/utilities';

@Component({
  selector: 'app-general-description-hotel',
  templateUrl: './general-description-hotel.component.html',
  styleUrls: ['./general-description-hotel.component.css', './../shared/hotel.css']
})
export class GeneralDescriptionHotelComponent extends AbstractGenericParentComponent implements OnInit, AfterViewInit   {

  @ViewChild (InternetComponent) internetChild;
  @ViewChild (ParkingComponent) parkingChild;
  @ViewChild (BreakfastComponent) breakfastComponentChild;
  @ViewChild (LanguageComponent) languageComponentChild;
  @ViewChild (FacilitiesComponent) facilityChild;
  @Input() establishmentId: number;
  
  public generalDescriptionEnum: GeneralDescriptionEnum;
  GeneralDescriptionEnum: typeof GeneralDescriptionEnum = GeneralDescriptionEnum;

  constructor(private formBuilder: FormBuilder, private genDescService: GeneralDescriptionHotelService) { 
    super();

    this.model = new GeneralDescriptionHotel();    
  } 

  ngOnInit() {
    this.formGroup = this.formBuilder.group( {
    });
  }

  ngAfterViewInit() {
    this.internetChild.hasInternetOptions = this.parkingChild.hasParkingOptions = this.getServiceOptions();
    this.initForm();
  }

  getServiceOptions() {
    return( [{id: GeneralDescriptionEnum.noId, desc: GeneralDescriptionEnum.no}, 
             {id: GeneralDescriptionEnum.freeId, desc: GeneralDescriptionEnum.yesFree}, 
             {id: GeneralDescriptionEnum.paidId, desc: GeneralDescriptionEnum.yesPaid}] );
  }

  transformGroupToModel() {
  }

  initForm() {
    this.initEmptyForm(this.formBuilder);
    
    this.formGroup.addControl(GeneralDescriptionEnum.internet, this.internetChild.formGroup);
    this.internetChild.formGroup.setParent(this.formGroup);
    this.formGroup.addControl(GeneralDescriptionEnum.parking, this.parkingChild.formGroup);
    this.parkingChild.formGroup.setParent(this.formGroup);
    this.formGroup.addControl(GeneralDescriptionEnum.breakfast, this.breakfastComponentChild.formGroup);
    this.breakfastComponentChild.formGroup.setParent(this.formGroup);
    this.formGroup.addControl(GeneralDescriptionEnum.languages, this.languageComponentChild.formGroup);
    this.languageComponentChild.formGroup.setParent(this.formGroup);
    this.formGroup.addControl(GeneralDescriptionEnum.facilities, this.facilityChild.formGroup);
    this.facilityChild.formGroup.setParent(this.formGroup);
  }

  onSubmit() {
    Utilities.log('the info sent', this.model);
    this.model.hotelServiceId = this.establishmentId;
    this.model.internet = this.internetChild.onSubmit();
    this.model.parking = this.parkingChild.onSubmit();
    this.breakfastComponentChild.onSubmit();
    return this.genDescService.save(this.model);
  }

}
