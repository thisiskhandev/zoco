import { RoomItemEnum } from './room-items-enum';
import { GenericFormModel } from '@shared/generic-form-model';

export class RoomItemsModel implements GenericFormModel {
    id: number;
    roomTotalMeasure: number;
    unitOfMeasurement: number;
    unitOfMeasurementName: string;

    setData(layout: any): void {
        this.unitOfMeasurement = RoomItemEnum.roomTotalMeasureDefaultValue; //TODO isilva ajustar el servicio para que devuelva esta info
        this.unitOfMeasurementName = layout.unitOfMeasurement;
        this.roomTotalMeasure = layout.totalRoomMeasure;
    }

    constructor() {
        this.id = RoomItemEnum.emptyLength;
        this.roomTotalMeasure = null;
        this.unitOfMeasurement = RoomItemEnum.emptyLength;
        this.unitOfMeasurementName = RoomItemEnum.emptyString;
    }
}