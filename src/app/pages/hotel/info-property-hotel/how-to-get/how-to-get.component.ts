import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faSquare, faCircle, faPlane, faBus, faTrain, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons';
import { AbstractHotelGenericFormComponent } from '@hotel/shared/abstract-hotel-generic-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { InfoPropertyHotelEnum } from '@hotel/info-property-hotel/shared/info-property-hotel-enum';
import { InfoPropertyHotelService } from '../shared/info-property-hotel.service';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
@Component({
  selector: 'app-how-to-get',
  templateUrl: './how-to-get.component.html',
  styleUrls: ['./how-to-get.component.css'],
  providers: [InfoPropertyHotelService]
})
export class HowToGetComponent extends AbstractHotelGenericFormComponent implements OnInit {

  @Output() items: EventEmitter< Array<string> > = new EventEmitter< Array<string> >();

  @Input() getHowToGetServices: boolean;
  @Input() title: string;
  

  InfoPropertyHotelEnum: typeof InfoPropertyHotelEnum = InfoPropertyHotelEnum;
  controls: Array<string> = [this.InfoPropertyHotelEnum.indication, this.InfoPropertyHotelEnum.distance, this.InfoPropertyHotelEnum.place, this.InfoPropertyHotelEnum.icon];

  itemsList: Array<any> = [];
  places:    Array<any> = [];
  icons:     Array<any> = [];

  // Font Awesome Icons to use this component.
  faSquare:  IconDefinition = faSquare;
  faCircle:  IconDefinition = faCircle;
  faPlane:   IconDefinition = faPlane;
  faBus:     IconDefinition = faBus;
  faTrain:   IconDefinition = faTrain;
  faPlus:    IconDefinition = faPlus;
  faTimes:   IconDefinition = faTimes;
  farCircle: IconDefinition = farCircle;


  constructor(private formBuilder: FormBuilder, private InfoPropertyHotelService: InfoPropertyHotelService) {
    super();
  }

  ngOnInit(): void {
    this.getIconsList();
    this.getItemsList();
    this.getPlaces();
    this.initForm();
  }

  initForm(): void {
    this.formGroup = this.formBuilder.group( {
      indication: [null, Validators.required],
      distance:   [null, Validators.required],
      place:      [null, Validators.required],
      icon:       [null, Validators.required]
    });
  } 

  onSubmit(): void {
    if(this.itemsList.length > 0) {
      this.items.emit(this.itemsList);
    }
    else {
      console.log(`Items are empty. ${this.title}`);
    }
  }

  addItem(): void  {
    if(this.formGroup.valid) {
      let properties: any = {};
  
      for(let control of this.controls) {
        if(control != this.InfoPropertyHotelEnum.icon) {
          properties[control] = this.formGroup.get(control).value;
        }
        else {
          properties[control] = this.getIcon(this.formGroup.get(control).value);
        }
      }
  
      this.formGroup.reset();
  
      this.itemsList.push(properties);
  
      this.items.emit(this.itemsList);
    }
    else {
      console.log("Fill all fields");
    }
  }

  removeItem(itemToRemove: any): void {
    this.itemsList.splice(this.itemsList.indexOf(itemToRemove), 1);

    this.items.emit(this.itemsList);
  }

  getPlaces(): void {
    if(this.getHowToGetServices) {
      this.places = this.InfoPropertyHotelService.getPlaces();
    }
    else {
      // Needs to get other services
      this.places = this.InfoPropertyHotelService.getPlaces();
    }
  }

  getItemsList(): void {
    if(this.getHowToGetServices) {
      this.itemsList = this.InfoPropertyHotelService.getItemsList();
    }
    else {
      // Needs to get other services
      this.itemsList = this.InfoPropertyHotelService.getItemsList();
      }
  }

  getIconsList(): void {
    this.icons = this.InfoPropertyHotelService.getIconsList();
  }

  getIcon(icon: string): IconDefinition {
    if(icon === "faTrain") {
      return this.faTrain;
    }
    else if(icon === "faPlane") {
      return this.faPlane;
    }
    else if(icon === "faBus") {
      return this.faBus;
    }
  }

  transformGroupToModel(): void {}
}
