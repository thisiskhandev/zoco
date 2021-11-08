import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsHotelModel } from './shared/view-details-hotel-model';
import { ViewDetailsHotelService } from './shared/view-details-hotel-service';
import { DetailsHotelEnum } from './shared/view-details-hotel-enum';
import { ListRoomsModel } from 'app/pages/hotel/view-details-hotel/shared/view-details-hotel-rooms-model';
import { Utilities } from '@shared/utilities';


@Component({
  selector: 'app-view-details-hotel',
  templateUrl: './view-details-hotel.component.html',
  styleUrls: ['./view-details-hotel.component.css']
})

export class ViewDetailsHotelComponent implements OnInit {
  DetailsHotelEnum: typeof DetailsHotelEnum = DetailsHotelEnum;
  hotelDetails: DetailsHotelModel;
  id: string;
 

  constructor(private route: ActivatedRoute, private detailsHotelService: ViewDetailsHotelService) {
  }

  getDetailsHotel(id: string): void {
    this.detailsHotelService.getDetails(id).subscribe(data =>
      {
        this.hotelDetails.setData(data.data);
      }
      );
  }

  ngOnInit() {
    this.hotelDetails = new DetailsHotelModel();
    this.id = this.route.snapshot.paramMap.get(DetailsHotelEnum.id);
    this.getDetailsHotel(this.id);
  }

  starsIsShow(): boolean {
      return this.hotelDetails.establishmentTypeId === DetailsHotelEnum.hotelEstablishmentTypeValue && this.hotelDetails.star_rating  &&  this.hotelDetails.star_rating  !== DetailsHotelEnum.start ;
    }
}
