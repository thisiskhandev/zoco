import { ListRoomsModel } from './view-details-hotel-rooms-model';
import { DetailsHotelEnum } from './view-details-hotel-enum';
import { Utilities } from '@shared/utilities';
import { CheckInCheckOutModel } from '../../payment-policies-hotel/check-in-check-out/shared/check-in-check-out.model';
import { GenericModel } from '@shared/generic-model';

export class DetailsHotelModel {
    id: number = DetailsHotelEnum.idDefaultValue;
    establishment_name: string = DetailsHotelEnum.establishmentNameDefaultValue;
    country: string = DetailsHotelEnum.countryDefaultValue;
    home_address: string = DetailsHotelEnum.homeAddressDefaultValue;
    quantityRooms: number = DetailsHotelEnum.quantityRoomsDefaultValue;
    star_rating: number = DetailsHotelEnum.starRatinDefaultValue;
    property_description: string = DetailsHotelEnum.propertyDescriptionDefaultValue;
    listRooms: Array<ListRoomsModel> = [];
    establishmentTypeId: number = DetailsHotelEnum.hotelEstablishmentTypeValue;
    checkInCheckOut: CheckInCheckOutModel;
    photos: Array<GenericModel>;
	start: string;    

    constructor() {
    }


    setData(data: any) {
        this.id = data.basicInfo.id;
        this.establishment_name = data.basicInfo.establishmentName;
        this.country = data.basicInfo.country;
        this.home_address = data.basicInfo.home_address;
        this.quantityRooms = data.basicInfo.numberOfRooms;
        this.star_rating = (data.basicInfo.starRating!== null)?data.basicInfo.starRating:DetailsHotelEnum.starRatinDefaultValue;
        this.property_description = data.basicInfo.stablishmentType.property_description;
        data.layouts.forEach(room => {
            const roomModel = new ListRoomsModel(room);
            this.listRooms.push(roomModel);
        });
        this.establishmentTypeId = data.basicInfo.stablishmentType.id;
        this.checkInCheckOut = (data.politicConditions) ? data.politicConditions.checkInCheckOutInfo : null;
        this.photos = (data.photos)  ? data.photos : [];
    }

}
