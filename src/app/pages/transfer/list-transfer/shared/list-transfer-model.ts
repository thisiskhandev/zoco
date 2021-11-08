import { ListTransferEnum } from './list-transfer-enum';

export class ListTransferModel {
    id: number;
    company_name: string;
    home_address: string;
    city: string;
    state: string;
    contact_person: string;
    total_vehicles: number;

    constructor(data: any) {
        this.id = data.id;
        this.company_name = data.nameDetails.name;
        this.home_address = data.addressInfo.address;
        this.city = data.addressInfo.city;
        this.state = data.addressInfo.state;
        this.contact_person = data.contactPhones.responsibleName;
        this.total_vehicles = data.totalVehicles;
    }

}
