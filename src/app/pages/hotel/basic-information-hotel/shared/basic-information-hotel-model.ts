import { PropertyEnum } from "../property/shared/property-enum";
import { Utilities } from '@shared/utilities';

const utilities: Utilities = new Utilities();

export class BasicInformationHotel {


    id: number;
    
    // Location Component
    establishmentName: string = "";
    //geo_coordinates: string = "";
    locationReference: string = "";
    state: string = "";
    city: string = "";
    country: string = "";
    zipCode: string = "";
    cuit_rif: string = "";
    home_address: string = "";
    first_phone_number: string = "";
    second_phone_number: string = "";
    third_phone_number: string = "";
    fourth_phone_number: string = "";
    fifth_phone_number: string = "";
    wsp_phone_number: string = "";
    email: string = "";
    logo_path: string = "logo test";


    // Property Component
    establishmentType: number = 0;
    haveStarRating: string = "";
    star_rating: number = PropertyEnum.starRatingDefaultValue;

    // Contact Detail Component
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

    filesToUpload: File;
    nameFolder: string = "";
    
    
    //iata_code: string = "";

    setData(detailsHotelModel: any): void {
        this.id                = detailsHotelModel.basicInfo.id;

        this.establishmentName = detailsHotelModel.basicInfo.establishmentName;
        //this.geo_coordinates   = detailsHotelModel.basicInfo.geo_coordinates;
        this.locationReference = detailsHotelModel.basicInfo.reference;
        this.state             = detailsHotelModel.basicInfo.state;
        this.city              = detailsHotelModel.basicInfo.city;  
        this.country           = detailsHotelModel.basicInfo.country;
        this.zipCode           = detailsHotelModel.basicInfo.zip;
        this.cuit_rif         = detailsHotelModel.basicInfo.cuit_rif;
        this.home_address           = detailsHotelModel.basicInfo.home_address;
        this.first_phone_number = detailsHotelModel.basicInfo.first_phone_number;
        this.second_phone_number = detailsHotelModel.basicInfo.second_phone_number;
        this.third_phone_number = detailsHotelModel.basicInfo.third_phone_number;
        this.fourth_phone_number = detailsHotelModel.basicInfo.fourth_phone_number;
        this.fifth_phone_number = detailsHotelModel.basicInfo.fifth_phone_number;
        this.wsp_phone_number = detailsHotelModel.basicInfo.wsp_phone_number;
        this.email = detailsHotelModel.basicInfo.email;
        this.logo_path = detailsHotelModel.basicInfo.logo_path;

        this.establishmentType = detailsHotelModel.basicInfo.establishmentType.id;
        this.haveStarRating    = String((detailsHotelModel.basicInfo.star_rating !== utilities.emptyLength));
        this.star_rating        = (detailsHotelModel.basicInfo.star_rating) ? detailsHotelModel.basicInfo.star_rating : PropertyEnum.starRatingNoApplyValue;

        this.isCompanyManagement   = detailsHotelModel.basicInfo.isCompanyManagement;
        this.companyManagementName = detailsHotelModel.basicInfo.hotelChainDescription;
        this.haveChannelManager    = detailsHotelModel.basicInfo.haveChannelManager;
        this.channelManagerName    = detailsHotelModel.basicInfo.channelManagerName;

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

        Utilities.log('BasicInformationHotel - setData: ',detailsHotelModel, this);
    }

}
