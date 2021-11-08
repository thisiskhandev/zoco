import { Component, OnInit, ViewChild, Input, AfterViewInit, OnChanges } from '@angular/core';
import { InfoPropertyHotelEnum } from './shared/info-property-hotel-enum';
import { InfoPropertyHotelService } from './shared/info-property-hotel.service';
import { GenericModel } from '@shared/generic-model';
import { FormBuilder } from '@angular/forms';
import { MultipleSelectorComponent } from '@commons/multiple-selector/multiple-selector.component';
import { InfoPropertyHotelModel } from './shared/info-property-hotel-model';
import { MultipleSelectorAccordionComponent } from '@commons/multiple-selector-accordion/multiple-selector-accordion.component';
import { AbstractGenericParentComponent } from '@shared/abstract-generic-parent.component';
import { HowToGetComponent } from './how-to-get/how-to-get.component';

@Component({
  selector: 'app-info-property-hotel',
  templateUrl: './info-property-hotel.component.html',
  styleUrls: ['./info-property-hotel.component.css']
})
export class InfoPropertyHotelComponent extends AbstractGenericParentComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild(HowToGetComponent) howToGetComponent: HowToGetComponent;

  @Input() establishmentId: number;
  @Input() hotelCompleteInfo: any;

  InfoPropertyHotelEnum: typeof InfoPropertyHotelEnum = InfoPropertyHotelEnum;

  nearbyAttractionsItems: Array<string> = [];
  howToGetItems: Array<string> = [];


  constructor() {
    super();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.initForm();
  }

  ngOnChanges(): void {
    console.log("this.hotelCompleteInfo 11");
    console.log("this.hotelCompleteInfo 11");
    console.log("this.hotelCompleteInfo 11");
    console.log("this.hotelCompleteInfo 11");
    console.log("this.hotelCompleteInfo 11");
    console.log("this.hotelCompleteInfo 11");
    console.log(this.hotelCompleteInfo);
  }

  initForm() {

  }

  onSubmit() {

  }

  show(): void {
    console.log("this.howToGetItems");
    console.log(this.howToGetItems);
    console.log("this.nearbyAttractionsItems");
    console.log(this.nearbyAttractionsItems);
  }

  setItems(items: Array<string>, areHowToGetItems: boolean): void {
    if(areHowToGetItems) {
      this.howToGetItems = items;
    }
    else {
      this.nearbyAttractionsItems = items;
    }
  }

}
