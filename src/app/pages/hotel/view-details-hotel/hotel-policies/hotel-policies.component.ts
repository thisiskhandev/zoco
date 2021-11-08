import { Component, AfterViewInit, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DetailsHotelEnum } from '../shared/view-details-hotel-enum';
import { DetailsHotelModel } from '../shared/view-details-hotel-model';
import { CheckInCheckOutModel } from '../../payment-policies-hotel/check-in-check-out/shared/check-in-check-out.model';
import { CheckInCheckOutEnum } from '../../payment-policies-hotel/check-in-check-out/shared/check-in-check-out.enum';
import { Utilities } from '@shared/utilities'; 

@Component({
  selector: 'app-hotel-policies',
  templateUrl: './hotel-policies.component.html',
  styleUrls: ['./hotel-policies.component.css']
})

export class HotelPoliciesComponent implements OnInit, OnChanges {
    DetailsHotelEnum: typeof DetailsHotelEnum = DetailsHotelEnum;
    @Input() checkInCheckOut: CheckInCheckOutModel;

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {      

      if(this.checkInCheckOut) {
        this.checkInCheckOut.checkInFromTime  =  String(Date.parse(CheckInCheckOutEnum.dateDummy+this.checkInCheckOut.checkInFromTime));  
        this.checkInCheckOut.checkOutFromTime =  String(Date.parse(CheckInCheckOutEnum.dateDummy+this.checkInCheckOut.checkOutFromTime));
      }
    }
}
