import { ExtraBedEnum } from "./extra-bed-enum";
import { GenericFormModel } from "@shared/generic-form-model";

export class ExtraBedModel implements GenericFormModel {
    id: number;
    hasExtraBed : string = ExtraBedEnum.falseString;
    quantity: number = ExtraBedEnum.defaultDropdownSelection;
    haveChildrenInCribs: string = ExtraBedEnum.falseString;
    childCribsPrice: number;
    haveChildren: string = ExtraBedEnum.falseString;
    childrenAges: number = ExtraBedEnum.defaultDropdownSelection;
    childrenPrice: number;
    haveAdults: string = ExtraBedEnum.falseString;
    adultPrice: number;

    constructor() {
        this.id = null
        this.hasExtraBed = ExtraBedEnum.falseString;
        this.quantity = null;
        this.haveChildrenInCribs = ExtraBedEnum.falseString;
        this.childCribsPrice = null; 
        this.haveChildren = ExtraBedEnum.falseString;
        this.childrenAges = null;
        this.childrenPrice = null;
        this.haveAdults = ExtraBedEnum.falseString;
        this.adultPrice = null;
    }

    setData(){
    }
}