import { BedInfoEnum } from './bed-info-enum';
import { BedTypeModel } from './bed-type-model';

export class BedInfoModel {
    roomPeopleQuantity: number = BedInfoEnum.roomPeopleQuantityDefaultValue;
    bedMeasures: Array<BedTypeModel>;
}