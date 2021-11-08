import { GenericFormModel } from "@shared/generic-form-model";
import { PhotoGalleryModel } from "@commons/photo-gallery/shared/photo-gallery-model";
import { GeneralDescriptionEnum } from "@hotel/general-description-hotel/shared/general-description-enum";
import { Utilities } from "@shared/utilities";

export class GeneralDescriptionModel implements GenericFormModel {
    id : number;
    description : string;
    tips : string;
    photoGalleryArray : Array<PhotoGalleryModel>;
    countImages : number;

    constructor() {
        this.id = null;
        this.description = null;
        this.tips = null;
        this.photoGalleryArray = [];
        this.countImages = Utilities.zero;
    }

    setData(detailsActivityModel : any) : void {
        // TODO: Recorrer la coleccion de fotos e invocar el metodo downloadFile para llenar el modelo
    }

    downloadFile( imagePath : string, id : number ) {
        fetch(imagePath)
        .then(res => res.blob())
        .then(blob => {
            var filename = imagePath.substring(imagePath.lastIndexOf(Utilities.urlRouteSeparator) + Utilities.first);
            var file = new File([blob], filename, {type: blob.type, lastModified: Date.now()});

            const object = new PhotoGalleryModel;
            object.id = id;
            object.image = file;
            object.method = GeneralDescriptionEnum.putMethod;
            this.photoGalleryArray.push(object);
        });
    }
}