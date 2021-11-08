import { BedTypeModel } from '../bed-info/shared/bed-type-model';
import { SpacesInfoModel } from '../bed-info/shared/spaces-info-model';
import { RoomInfoModel } from '../room-info/shared/room-info-model';
import { RoomItemsModel } from '../room-items/shared/room-items-model';
import { LayoutEnum } from './layout-enum';
import { RoomItemEnum } from '../room-items/shared/room-items-enum';
import { GenericFormModel } from '@shared/generic-form-model';
import { Utilities } from '@shared/utilities';

export class LayoutModel implements GenericFormModel {
    id: number;
    hotelServiceId: number;
    roomInfo: RoomInfoModel;
    spaces: SpacesInfoModel;
    bedInfo: Array<BedTypeModel>;
    roomItemsModel: RoomItemsModel;
    price: number = LayoutEnum.priceDefaultValue;
    totalRoomMeasure: number = LayoutEnum.totalRoomMeasureDefaultValue;
    unitOfMeasurement: number = RoomItemEnum.unitOfMeasurementDefaultValue;
    unitOfMeasurementName: string; 

    constructor() {
        this.roomInfo = new RoomInfoModel();
        this.spaces = new SpacesInfoModel();
        this.bedInfo = new Array<BedTypeModel>();
        this.roomItemsModel = new RoomItemsModel();
    }


    setDataFromLayoutList(layout: any) {

        const utilities = new Utilities;

        this.id = layout.id;
        this.hotelServiceId = layout.hotelServiceId;
        this.totalRoomMeasure = layout.room_total_measure;
        this.price = layout.price;
        this.unitOfMeasurement = RoomItemEnum.unitOfMeasurementDefaultValue; //TODO isilva ajustar el servicio para que devuelva esta info
        this.unitOfMeasurementName = layout.unit_measure_room;
        this.roomInfo = new RoomInfoModel();
        this.roomInfo.setData(layout.roomInfo);

        this.spaces = new SpacesInfoModel();
        this.bedInfo = new Array<BedTypeModel>();

        this.roomItemsModel = new RoomItemsModel();
        this.roomItemsModel.setData(layout);

        
        if(layout.bedInfo && layout.bedInfo.length > utilities.emptyLength) {
            layout.bedInfo.forEach(bed => {
                let bedTypeModel = new BedTypeModel();
                bedTypeModel.setData(bed);
                this.bedInfo.push(bedTypeModel);
            });
        }
    }


    setData(completeInfo: any): void {}

    setDataWithCompleteInfo(completeInfo: any, layout: any): void {
        
        const utilities = new Utilities;

        this.id = layout.id;
        this.hotelServiceId = completeInfo.basicInfo.hotelServiceId;
        this.totalRoomMeasure = layout.totalRoomMeasure;
        this.price = layout.price;
        this.unitOfMeasurement = layout.unitOfMeasurement.id;
        this.unitOfMeasurementName = layout.unitOfMeasurement.name;
        this.roomInfo = new RoomInfoModel();
        this.roomInfo.setData(layout.roomInfo);

        this.spaces = new SpacesInfoModel();
        this.bedInfo = new Array<BedTypeModel>();

        this.roomItemsModel = new RoomItemsModel();
        this.roomItemsModel.setData(layout);

        
        if(layout.bedInfo && layout.bedInfo.length > utilities.emptyLength) {
            layout.bedInfo.forEach(bed => {
                let bedTypeModel = new BedTypeModel();
                bedTypeModel.setData(bed);
                this.bedInfo.push(bedTypeModel);
            });
        }
    }
}
