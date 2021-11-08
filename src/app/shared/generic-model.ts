export class GenericModel {
    id:   number;
    name: string;
    desc: string;
    image_path: string;
    imagePath: string;

    static createGenericModel( id: number, name: string, desc: string): GenericModel {

        let genericModel = new GenericModel();
        genericModel.id  = id ;
        genericModel.name = name;
        genericModel.desc = desc;

        return genericModel;
    }
}