import { ViewDetailsVehiclesModel } from "../view-details-vehicles/shared/view-details-vehicles-model";
import { ViewDetailsRatesModel } from "../view-details-rates/shared/view-details-rates-model";
import { ViewDetailsTransferEnum } from "./view-details-transfer-enum";

export class ViewDetailsTransferModel {
    transferId : number;
    nameCompany : string;       
    viewDetailsVehicles : ViewDetailsVehiclesModel;
    viewDetailsRates : ViewDetailsRatesModel;

    constructor() {
        this.transferId = null;
        this.nameCompany = null;        
        this.viewDetailsVehicles = new ViewDetailsVehiclesModel;
        this.viewDetailsRates = new ViewDetailsRatesModel;
    }

    setData(data : any) {
        if(data.basicInfo)
            this.nameCompany = data.basicInfo.nameDetails ? data.basicInfo.nameDetails.name : null;
        if(data.vehiclesFeatures)   
            this.transferId = data.vehiclesFeatures.transferServiceId;

        this.viewDetailsVehicles.setData(data.basicInfo.totalVehicles, data.vehiclesFeatures, 
            data.transferDrivers, data.settings);

        if(data.rates)
            this.viewDetailsRates.setData(data.rates);
    }
}