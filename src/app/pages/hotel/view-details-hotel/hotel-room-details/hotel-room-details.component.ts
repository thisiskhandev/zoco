import { Component, OnInit, Input } from '@angular/core';
import { DetailsHotelEnum } from '../shared/view-details-hotel-enum';
import { DetailsHotelModel } from '../shared/view-details-hotel-model';
import { Utilities } from '@shared/utilities';

@Component({
  selector: 'app-room-details',
  templateUrl: './hotel-room-details.component.html',
  styleUrls: ['./hotel-room-details.component.css']
})

export class HotelRoomDetailsComponent implements OnInit {
    DetailsHotelEnum: typeof DetailsHotelEnum = DetailsHotelEnum;
    @Input() hotelDetails: DetailsHotelModel;
    maxGuestIconToShow: number = DetailsHotelEnum.maxGuestIconToShow;
    utilities:Utilities = new Utilities();
    displayedColumns = [
        DetailsHotelEnum.room_type, DetailsHotelEnum.room_name,
        DetailsHotelEnum.number_of_this_room, DetailsHotelEnum.living_quantity,
        DetailsHotelEnum.bath_quantity, DetailsHotelEnum.size,
        DetailsHotelEnum.measure, DetailsHotelEnum.max_occupancy, DetailsHotelEnum.price
      ];
    displayedColumnsPolicies = [
        DetailsHotelEnum.check_in,
        DetailsHotelEnum.check_out
      ];
    highlightedRows = [];

    constructor() {
    }

    ngOnInit() {
    }

}
