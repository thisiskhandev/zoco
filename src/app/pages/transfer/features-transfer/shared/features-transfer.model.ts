import { GenericFormModel } from "@shared/generic-form-model";
import { VehicleInfoModel } from "../vehicle-info/shared/vehicle-info.model";
import { PhotoGalleryModel } from "@commons/photo-gallery/shared/photo-gallery-model";
import { Utilities } from "@shared/utilities";
import { PhotosHotelComponent } from "@hotel/photos-hotel/photos-hotel.component";

export class FeaturesTransferModel implements GenericFormModel {

    id: number;
    transferServiceId: number;
    vehicleInfo: VehicleInfoModel;
    vehiclesInfo: Array<VehicleInfoModel>;
    photos: Array<PhotoGalleryModel>;

    constructor() {
    	this.id = null;
    	this.transferServiceId = null;
    	this.vehicleInfo = new VehicleInfoModel();
    	this.vehiclesInfo = [];
        this.photos = [];
    }

    setData(data) {
        this.id                     = data.transferServiceId;
        this.transferServiceId      = data.transferServiceId;
        this.vehicleInfo            = new VehicleInfoModel();
        this.vehiclesInfo           = [];
        data.vehiclesInfo.forEach(vehicle => {  
            const vehiclesModel = vehicle as VehicleInfoModel;
            this.vehiclesInfo.push(vehiclesModel);
        });
 
        this.photos                 = [];

        data.photos.forEach(photo => {
            PhotoGalleryModel.downloadImageFile( photo.imagePath, photo.id, this.photos);
        });        
    }
}
