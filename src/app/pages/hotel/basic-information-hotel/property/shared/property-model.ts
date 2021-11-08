import { PropertyEnum } from "./property-enum";
import { Utilities } from "@shared/utilities";
import { BasicInformationHotel } from '@hotel/basic-information-hotel/shared/basic-information-hotel-model';
import { GenericFormModel } from "@shared/generic-form-model";

const utilities: Utilities = new Utilities();

export class PropertyModel implements GenericFormModel {
    id: number;
    establishmentType:  number = 0;
    haveStarRating:    string = "";
    star_rating:        number = PropertyEnum.starRatingDefaultValue;

    setData(detailsHotelModel: any): void {

        this.id = detailsHotelModel.basicInfo.id;
        this.establishmentType = detailsHotelModel.basicInfo.establishmentType.id;
        this.haveStarRating    = String((detailsHotelModel.basicInfo.star_rating !== utilities.emptyLength));
        this.star_rating        = (detailsHotelModel.basicInfo.star_rating) ? detailsHotelModel.basicInfo.star_rating : PropertyEnum.starRatingNoApplyValue;

        Utilities.log('PropertyModel - setData: ',this,detailsHotelModel);


    }

}