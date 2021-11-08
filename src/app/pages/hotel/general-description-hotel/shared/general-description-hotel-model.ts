import { InternetModel } from '../internet/shared/internet-model';
import { ParkingModel } from '../parking/shared/parking-model';
import { BreakfastModel } from '../breakfast/shared/breakfast-model';
import { GenericFormModel } from '@shared/generic-form-model';
import { InternetEnum } from '@hotel/general-description-hotel/internet/shared/internet-enum';
import { ParkingEnum } from '@hotel/general-description-hotel/parking/shared/parking-enum';
import { BreakfastEnum } from '@hotel/general-description-hotel/breakfast/shared/breakfast-enum';
import { BreakfastList } from '@hotel/general-description-hotel/breakfast/shared/breakfast-list';

export class GeneralDescriptionHotel implements GenericFormModel {
    id: number; // Indica que es una edicion
    operationId: number;  
    hotelServiceId: number;  
    internet: InternetModel;
    parking: ParkingModel;    
    breakfasts: BreakfastModel;
    langs: Array <number>;
    facilities: Array <number>;

    constructor() {
        this.id = null;
        this.operationId = null;
        this.hotelServiceId = null;
        this.internet = new InternetModel();
        this.parking = new ParkingModel();
        this.breakfasts = new BreakfastModel();
        this.langs = [];
        this.facilities = [];
    }

    setData(detailsHotelModel: any): void {

        if(detailsHotelModel.descriptionGen) {
            this.id = detailsHotelModel.descriptionGen.id;
            this.hotelServiceId = detailsHotelModel.basicInfo.id;

            if(detailsHotelModel.descriptionGen.internet) {
                this.internet = detailsHotelModel.descriptionGen.internet;
                this.validateInternetOptions(detailsHotelModel.descriptionGen.internet);
            }
            
            if(detailsHotelModel.descriptionGen.parking) {
                this.parking = detailsHotelModel.descriptionGen.parking;
                this.validateParkingOptions(detailsHotelModel.descriptionGen.parking);
            }
            
            this.breakfasts = new BreakfastModel();
            this.fullBreakfastList(detailsHotelModel.descriptionGen.breakfasts);
            this.validateBreakfastOptions(detailsHotelModel.descriptionGen.breakfasts);
            
            const languagesType = detailsHotelModel.descriptionGen.langs;
            this.langs = [];
            languagesType.forEach(element => {
                this.langs.push(element.id);
            });
            
            const facilitiesType = detailsHotelModel.descriptionGen.facilities;
            this.facilities = [];
            facilitiesType.forEach(element => {
                this.facilities.push(element.id);
            });
        }
    }

    validateInternetOptions(internet : any) :void {
        if( internet.payInternet ) {
            this.internet.hasInternet = InternetEnum.internetPaid;
            this.initInternetOptions(internet);
        }
        else if( internet.hasInternet) {
            this.internet.hasInternet = InternetEnum.internetFree;
            this.initInternetOptions(internet);
        } 
        else if( !internet.hasInternet ) 
            this.internet.hasInternet = InternetEnum.noInternet;
    }

    initInternetOptions(internetOptions : any): void {
        this.internet.internetConnectType = internetOptions.internetConnectType ? internetOptions.internetConnectType.id : null;
        this.internet.internetPlaces = internetOptions.internetPlaces ? internetOptions.internetPlaces.id : null;
        this.internet.internetPrice = internetOptions.internetPrice;
    }

    validateParkingOptions(parking : any): void {
        if( parking.payParking ) {
            this.parking.hasParking = ParkingEnum.parkingPaid;            
        }
        else if( parking.hasParking) {
            this.parking.hasParking = ParkingEnum.parkingFree;
        } 
        else if( !parking.hasParking )
            this.parking.hasParking = ParkingEnum.noParking;

        this.initParkingOptions(parking);
    }

    initParkingOptions(parkingOptions : any): void {
        this.parking.parkingAccess = parkingOptions.parkingAccess ? parkingOptions.parkingAccess : null;
        this.parking.parkingLocation = parkingOptions.parkingLocation ? parkingOptions.parkingLocation : null;
        this.parking.parkingCondition = parkingOptions.parkingCondition ? parkingOptions.parkingCondition : null;
        this.parking.parkingPrice = parkingOptions.parkingPrice;
    }

    validateBreakfastOptions(breakfast : any) :void {
        if( breakfast.payBreakfast ) {
            this.breakfasts.hasBreakfast = BreakfastEnum.yesPaidId;
        }
        else if( breakfast.hasBreakfast) {
            this.breakfasts.hasBreakfast = BreakfastEnum.yesFreeId;
        } 
        else if( !breakfast.hasBreakfast ) 
            this.breakfasts.hasBreakfast = BreakfastEnum.noId;
    }

    fullBreakfastList(breakfast : any) : void {
        this.breakfasts.hasBreakfast = breakfast.hasBreakfast;
        this.breakfasts.breakfastList = [];

        for(let i=0; i<breakfast.breakfastList.length; i++ ){
            const list = new BreakfastList();
            list.id = breakfast.breakfastList[i].id;
            list.price = breakfast.breakfastList[i].breakfastPrice;
            this.breakfasts.breakfastList.push ( list );
        }
    }
}
