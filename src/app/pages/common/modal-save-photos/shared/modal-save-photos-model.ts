import { PhotoGalleryModel } from "@commons/photo-gallery/shared/photo-gallery-model";
import { GenericFormModel } from "@shared/generic-form-model";

export class ModalSavePhotosModel implements GenericFormModel{
    id : number;
    images : PhotoGalleryModel [];
    apiUrl : string;

    constructor() {
        this.id = null;
        this.images = [];
        this.apiUrl = null;
    }

    setData() {}
}