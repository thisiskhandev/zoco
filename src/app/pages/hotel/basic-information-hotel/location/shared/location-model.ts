import { BasicInformationHotel } from '@hotel/basic-information-hotel/shared/basic-information-hotel-model';
import { Utilities } from '@shared/utilities';
import { LocationEnum } from './location-enum';

export class LocationModel {
    id: number;
    // geo_coordinates: string = LocationEnum.defaultGeoPosition;
    locationReference: string = "";
    state: string = "";
    city: string = "";
    country: string = "";
    zipCode: string = "";
    cuit_rif: string = "";
    establishmentName: string = "";
    home_address: string = "";

    first_phone_number: string = "";
    second_phone_number: string = "";
    third_phone_number: string = "";
    fourth_phone_number: string = "";
    fifth_phone_number: string = "";
    wsp_phone_number: string = "";
    email: string = "";
    logo_path: string = "";

    filesToUpload: File = undefined;
    nameFolder: string = "";
    
    
    setData(detailsHotelModel: any): void { 
        
        this.id = detailsHotelModel.basicInfo.id;
        // this.geo_coordinates = detailsHotelModel.basicInfo.geoCoordinates;
        this.locationReference = detailsHotelModel.basicInfo.reference;
        this.state = detailsHotelModel.basicInfo.state;
        this.city = detailsHotelModel.basicInfo.city;
        this.country = detailsHotelModel.basicInfo.country;
        this.zipCode = detailsHotelModel.basicInfo.zip;
        this.logo_path = detailsHotelModel.basicInfo.logo_path;

        this.cuit_rif = detailsHotelModel.basicInfo.cuit_rif;
        this.establishmentName = detailsHotelModel.basicInfo.establishmentName;
        this.home_address = detailsHotelModel.basicInfo.home_address;

        this.first_phone_number = detailsHotelModel.basicInfo.first_phone_number;
        this.second_phone_number = detailsHotelModel.basicInfo.second_phone_number;
        this.third_phone_number = detailsHotelModel.basicInfo.third_phone_number;
        this.fourth_phone_number = detailsHotelModel.basicInfo.fourth_phone_number;
        this.fifth_phone_number = detailsHotelModel.basicInfo.fifth_phone_number;
        this.wsp_phone_number = detailsHotelModel.basicInfo.wsp_phone_number;
        
        this.email = detailsHotelModel.basicInfo.email;
        this.logo_path = detailsHotelModel.basicInfo.logo_path;
        
        Utilities.log('LocationModel - set data: ',this, detailsHotelModel);
    }
}