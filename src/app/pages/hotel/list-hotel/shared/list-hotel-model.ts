import { ListHotelEnum } from './list-hotel-enum';

export class ListHotelModel {
    id: number;
    establishment_name: string;
    country: string;
    iataCode: string;
    home_address: string;
    id_user: number;

    constructor(data : any) {
        this.id = data.id;
        this.establishment_name = data.establishmentName;
        this.country = data.country;
        this.iataCode = (data.iata_code) ? data.iata_code.toLowerCase(): ListHotelEnum.defaultIataCode;
        this.home_address = data.home_address;
    }

}
