import { BedInfoEnum } from './bed-info-enum';
import { GenericFormModel } from '@shared/generic-form-model';

export class BedTypeModel implements GenericFormModel {
    id:                 number = BedInfoEnum.bedTypeDefaultValue;
    itemQuantity:       number = BedInfoEnum.bedTypeQuatityModelDefaultValue;
    itemPeopleQuantity: number= BedInfoEnum.itemPeopleQuantityDefaultValue; 

    setData(bedInfo: any): void {
        this.id= bedInfo.id;                
        this.itemQuantity= bedInfo.itemQuantity;      
        this.itemPeopleQuantity= bedInfo.itemPeopleQuantity;
    }
}