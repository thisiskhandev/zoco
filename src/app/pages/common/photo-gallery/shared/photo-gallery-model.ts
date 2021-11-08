import { GenericFormModel } from "@shared/generic-form-model";
import { Utilities } from "@shared/utilities";
import { PhotoGalleryEnum } from "@commons/photo-gallery/shared/photo-gallery-enum";

export class PhotoGalleryModel implements GenericFormModel {
    id : number;
    image : File;
    checkboxId : string;
    checked : string;
    spanId : string;
    method : string;
    imagePath: string;

    constructor() {
        this.id = null;
        this.image = null;
        this.checkboxId = null;
        this.checked = Utilities.falseString;
        this.spanId = null;
        this.method = PhotoGalleryEnum.postMethod;
        this.imagePath = '';
    }

    setData() {}

    static downloadImageFile( imagePath : string, id : number, photoGalleryArray: Array<PhotoGalleryModel> ) {
        let utilities = new Utilities();        
        fetch(imagePath)
        .then(res => res.blob())
        .then(blob => {
            var filename = imagePath.substring(imagePath.lastIndexOf(Utilities.urlRouteSeparator) + utilities.one);
            var file = new File([blob], filename, {type: blob.type, lastModified: Date.now()});

            const object = new PhotoGalleryModel();
            object.id = id;
            object.image = file;
            object.method = Utilities.putMethod;
            object.imagePath = imagePath;
            photoGalleryArray.push(object);
        });
    }
}
