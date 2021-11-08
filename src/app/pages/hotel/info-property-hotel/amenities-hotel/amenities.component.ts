import { Component, OnInit, Input, OnChanges } from '@angular/core';


import { InfoPropertyHotelService } from '../shared/info-property-hotel.service';
import { AbstractHotelGenericFormComponent } from '../../shared/abstract-hotel-generic-form.component';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css'],
  providers: [InfoPropertyHotelService]
})
export class AmenitiesComponent extends AbstractHotelGenericFormComponent implements OnInit, OnChanges {

  @Input() hotelCompleteInfo: any;

  amenities: Array<any> = [];
  amenitiesList: Array<any> = [];

  properties: Array<any> = [
                              {
                                  "value": 0,
                                  "label": false
                              },
                              {
                                  "value": 1,
                                  "label": true
                              }
                           ];

  constructor(private infoPropertyHotelService: InfoPropertyHotelService) { 
    super();
  }

  ngOnInit(): void {
    this.getAmenitiesTypes();
  }

  ngOnChanges(): void {
    if(this.hotelCompleteInfo.amenities != undefined) {
      this.model = this.hotelCompleteInfo.amenities;
      console.log("this.hotelCompleteInfo AMENITIES");
      console.log(this.model);
    }
  }

  test(message: string, item: any): void {
    console.log(`Marque un radio button. ${message.toUpperCase()}`);
    console.log(item);
  }

  getAmenitiesTypes(): void {
    this.infoPropertyHotelService.getAmenitiesTypes().subscribe( (response) => {
      this.amenities = response.data;

      for(let item of this.amenities) {
        this.amenitiesList.push(item.amenitiesList)
      }

      console.log("this.amenities");
      console.log(this.amenities);
      console.log(this.amenitiesList);
    })
  }

  initForm(): void {}

  onSubmit(): void {}

  transformGroupToModel(): void {}

}
