import { Utilities } from "@shared/utilities";
import { BasicInformationHotel } from '@hotel/basic-information-hotel/shared/basic-information-hotel-model';
import { GenericFormModel } from "@shared/generic-form-model";

export class ContactDetailModel implements GenericFormModel {

    id: number;
    isCompanyManagement: string | boolean = "";
    companyManagementName: string = "";
    haveChannelManager: string | boolean = "";
    channelManagerName: string = "";

    cc_name: string = "";
    cc_last_name: string = "";
    cc_email: string = "";
    cc_phone_number: string = "";
    cc_wsp_phone_number: string = "";
    cc_different_address: string | boolean = "";
    cc_home_address: string = "";
    cc_country: string | number = "";
    cc_state: string | number = "";
    cc_city: string = "";
    cc_zip: string = "";

    ca_name: string = "";
    ca_last_name: string = "";
    ca_email: string = "";
    ca_phone_number: string = "";
    ca_wsp_phone_number: string = "";
    ca_different_address: string | boolean = "";
    ca_home_address: string = "";
    ca_country: string | number = "";
    ca_state: string | number = "";
    ca_city: string = "";
    ca_zip: string = "";

    cp_name: string = "";
    cp_last_name: string = "";
    cp_email: string = "";
    cp_phone_number: string = "";
    cp_wsp_phone_number: string = "";
    cp_different_address: string | boolean = "";
    cp_home_address: string = "";
    cp_country: string | number = "";
    cp_state: string | number = "";
    cp_city: string = "";
    cp_zip: string = "";

    cr_name: string = "";
    cr_last_name: string = "";
    cr_email: string = "";
    cr_phone_number: string = "";
    cr_wsp_phone_number: string = "";
    cr_different_address: string | boolean = "";
    cr_home_address: string = "";
    cr_country: string | number = "";
    cr_state: string | number = "";
    cr_city: string = "";
    cr_zip: string = "";


    setData(detailsHotelModel: any): void {
        this.id = detailsHotelModel.basicInfo.id;
        this.isCompanyManagement = String(detailsHotelModel.basicInfo.isCompanyManagement);
        this.companyManagementName = detailsHotelModel.basicInfo.companyManagementName;
        this.haveChannelManager = detailsHotelModel.basicInfo.haveChannelManager;
        this.channelManagerName = detailsHotelModel.basicInfo.channelManagerName;

        this.cc_name = detailsHotelModel.basicInfo.cc_name;
        this.cc_last_name = detailsHotelModel.basicInfo.cc_last_name;
        this.cc_email = detailsHotelModel.basicInfo.cc_email;
        this.cc_phone_number = detailsHotelModel.basicInfo.cc_phone_number;
        this.cc_wsp_phone_number = detailsHotelModel.basicInfo.cc_wsp_phone_number;
        this.cc_different_address = detailsHotelModel.basicInfo.cc_different_address;
        this.cc_home_address = detailsHotelModel.basicInfo.cc_home_address;
        this.cc_country = detailsHotelModel.basicInfo.cc_country;
        this.cc_state = detailsHotelModel.basicInfo.cc_state;
        this.cc_city = detailsHotelModel.basicInfo.cc_city;
        this.cc_zip = detailsHotelModel.basicInfo.cc_zip;

        this.ca_name = detailsHotelModel.basicInfo.ca_name;
        this.ca_last_name = detailsHotelModel.basicInfo.ca_last_name;
        this.ca_email = detailsHotelModel.basicInfo.ca_email;
        this.ca_phone_number = detailsHotelModel.basicInfo.ca_phone_number;
        this.ca_wsp_phone_number = detailsHotelModel.basicInfo.ca_wsp_phone_number;
        this.ca_different_address = detailsHotelModel.basicInfo.ca_different_address;
        this.ca_home_address = detailsHotelModel.basicInfo.ca_home_address;
        this.ca_country = detailsHotelModel.basicInfo.ca_country;
        this.ca_state = detailsHotelModel.basicInfo.ca_state;
        this.ca_city = detailsHotelModel.basicInfo.ca_city;
        this.ca_zip = detailsHotelModel.basicInfo.ca_zip;

        this.cp_name = detailsHotelModel.basicInfo.cp_name;
        this.cp_last_name = detailsHotelModel.basicInfo.cp_last_name;
        this.cp_email = detailsHotelModel.basicInfo.cp_email;
        this.cp_phone_number = detailsHotelModel.basicInfo.cp_phone_number;
        this.cp_wsp_phone_number = detailsHotelModel.basicInfo.cp_wsp_phone_number;
        this.cp_different_address = detailsHotelModel.basicInfo.cp_different_address;
        this.cp_home_address = detailsHotelModel.basicInfo.cp_home_address;
        this.cp_country = detailsHotelModel.basicInfo.cp_country;
        this.cp_state = detailsHotelModel.basicInfo.cp_state;
        this.cp_city = detailsHotelModel.basicInfo.cp_city;
        this.cp_zip = detailsHotelModel.basicInfo.cp_zip;

        this.cr_name = detailsHotelModel.basicInfo.cr_name;
        this.cr_last_name = detailsHotelModel.basicInfo.cr_last_name;
        this.cr_email = detailsHotelModel.basicInfo.cr_email;
        this.cr_phone_number = detailsHotelModel.basicInfo.cr_phone_number;
        this.cr_wsp_phone_number = detailsHotelModel.basicInfo.cr_wsp_phone_number;
        this.cr_different_address = detailsHotelModel.basicInfo.cr_different_address;
        this.cr_home_address = detailsHotelModel.basicInfo.cr_home_address;
        this.cr_country = detailsHotelModel.basicInfo.cr_country;
        this.cr_state = detailsHotelModel.basicInfo.cr_state;
        this.cr_city = detailsHotelModel.basicInfo.cr_city;
        this.cr_zip = detailsHotelModel.basicInfo.cr_zip;

        Utilities.log('ContactDetailModel - setData',this);
    }


}