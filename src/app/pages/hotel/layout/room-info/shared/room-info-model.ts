import { RoomInfoEnum } from './room-info-enum';
import { GenericFormModel } from '@shared/generic-form-model';

export class RoomInfoModel implements GenericFormModel {
    id: number;
    roomTypeId: number = RoomInfoEnum.defaultRoomTypeId;
    quantity: number = RoomInfoEnum.defaultQuantity;
    roomPeopleQuantity: number;
    roomNameId: number = RoomInfoEnum.roomNameDefaultValue;
    roomName: string; 
    customName: string = RoomInfoEnum.customNameDefaultValue;
    hasSmokingPolicy: string = RoomInfoEnum.hasSmokingPolicyDefaultValue;
    smokingPolicyDescription: string = RoomInfoEnum.smokingPolicyDescriptionDefaultValue;


    setData(roomInfo: any): void {
        
        this.roomTypeId = roomInfo.roomType.id;
        this.quantity = roomInfo.quantity;
        this.roomPeopleQuantity = roomInfo.roomPeopleQuantity;
        this.roomNameId = roomInfo.roomName.id;
        this.roomName = roomInfo.roomName.name
        this.customName = roomInfo.customName;
        this.hasSmokingPolicy = roomInfo.hasSmokingPolicy;
        this.smokingPolicyDescription = roomInfo.smokingPolicyDescription;
    }



}