import { GenericFormModel } from "@shared/generic-form-model";
import { PhotosHotelEnum } from "@hotel/photos-hotel/shared/photos-hotel-enum";
import { PhotoGalleryModel } from "@commons/photo-gallery/shared/photo-gallery-model";

export class PhotosHotelModel implements GenericFormModel {
    id : number;
    hotelServiceId : number;
    photoGalleryArray : Array<PhotoGalleryModel>;
    countImages : number;

    constructor() {
        this.id = null;
        this.hotelServiceId = null;
        this.photoGalleryArray = [];
        this.countImages = PhotosHotelEnum.valueZero;
    }

    setData(detailsHotelModel: any): void {
        if(detailsHotelModel.photos.length > PhotosHotelEnum.valueZero ) {
            this.id = detailsHotelModel.basicInfo.id;
            this.hotelServiceId = detailsHotelModel.basicInfo.id;

            detailsHotelModel.photos.forEach(element => {
                PhotoGalleryModel.downloadImageFile( element.imagePath, element.id, this.photoGalleryArray );
                this.countImages ++;
            });
        }
    }
}
