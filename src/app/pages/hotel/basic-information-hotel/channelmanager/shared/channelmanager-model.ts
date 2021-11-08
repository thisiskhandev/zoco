import { Utilities } from "@shared/utilities";
import { BasicInformationHotel } from '@hotel/basic-information-hotel/shared/basic-information-hotel-model';
import { GenericFormModel } from "@shared/generic-form-model";

export class ChannelManagerModel implements GenericFormModel {
    id: number;
    haveChannelManager: string = "";
    channelManagerName: string = "";


    setData(detailsHotelModel: any): void {
        this.id = detailsHotelModel.basicInfo.id;
        this.haveChannelManager = String(detailsHotelModel.basicInfo.haveChannelManager);
        this.channelManagerName = detailsHotelModel.basicInfo.channelManagerName;
        Utilities.log('ChannelManagerModel - setData', this);
    }

}