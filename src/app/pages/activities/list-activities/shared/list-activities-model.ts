export class ListActivitiesModel {
    id: number;
    name: string;
    country: string;
    address: string;
    id_user: number;

    constructor(data : any) {
        this.id = data.id;
        this.name = data.companyName;
        this.country = data.country;
        this.address = data.home_address;
    }    
}