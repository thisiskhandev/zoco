import { GenericFormModel } from "@shared/generic-form-model";
import { ExtraBedModel } from "@hotel/amenities-hotel/extra-bed/shared/extra-bed-model";
import { AmenitiesList } from "@hotel/amenities-hotel/shared/amenitiesList-model";
import { Utilities } from "@shared/utilities";
import { AmenitiesSubsection, AmenitiesEnum } from "@hotel/amenities-hotel/shared/amenities-enum";

export class AmenitiesModel implements GenericFormModel {
    id: number;
    operationId: number; 
    hotelServiceId: number;
    hasExtraBed: string;
    extraBeds: ExtraBedModel;  
    amenities = [];
    amenitiesList : Array<AmenitiesList>; 
    
    constructor() {
        this.id = null;
        this.operationId = null;
        this.hotelServiceId = null;
        this.hasExtraBed = Utilities.falseString;
        this.extraBeds = new ExtraBedModel();
        this.amenities = [];
        this.amenitiesList = [];
    }

    setData(detailsHotelModel: any): void {
        if(detailsHotelModel.amenities)  {
            this.id = detailsHotelModel.amenities.id;
            this.hotelServiceId = detailsHotelModel.amenities.hotelServiceId;
       
            this.hasExtraBed = (detailsHotelModel.amenities.extraBeds.hasExtraBed).toString();
            this.extraBeds = new ExtraBedModel();

            if(this.hasExtraBed != Utilities.falseString) {
                this.extraBeds.hasExtraBed = (detailsHotelModel.amenities.extraBeds.hasExtraBed).toString();
                this.extraBeds.quantity = detailsHotelModel.amenities.extraBeds.quantity;
                this.extraBeds.haveChildrenInCribs = (detailsHotelModel.amenities.extraBeds.haveChildrenInCribs).toString();
                this.extraBeds.childCribsPrice = detailsHotelModel.amenities.extraBeds.childCribsPrice;
                this.extraBeds.haveChildren = (detailsHotelModel.amenities.extraBeds.haveChildren).toString();
                this.extraBeds.childrenAges = detailsHotelModel.amenities.extraBeds.childrenAges;
                this.extraBeds.childrenPrice = detailsHotelModel.amenities.extraBeds.childrenPrice;
                this.extraBeds.haveAdults = (detailsHotelModel.amenities.extraBeds.haveAdults).toString();
                this.extraBeds.adultPrice = detailsHotelModel.amenities.extraBeds.adultPrice;
            }           

            const amenitiesType = detailsHotelModel.amenities.amenities;
            this.amenities = [];

            amenitiesType.forEach(element => {
                const obj = new AmenitiesList();
                obj.id = element.id;
                obj.description = element.amenitiesTypeDescription;
                
                element.amenitiesList.forEach( item => {
                    obj.items.push(item.id);
                }) 

                let index = this.findModel(element.amenitiesTypeDescription);
                if(index != AmenitiesEnum.negativeValue) {
                    this.amenitiesList[index] = obj;
                }         
            });
        } 
        
    }

    findModel(description : number){
        let index = AmenitiesSubsection.subsections.findIndex(i=> i.title === description);
        return index;
    }

}
