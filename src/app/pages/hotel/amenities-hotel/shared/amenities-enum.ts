import { GenericModel } from "@shared/generic-model";

export enum AmenitiesEnum {
    title = 'Amenities',
    subtitle = '',

    subsection1 = 'General Amenities',
    subsection2 = 'Bathroom',
    subsection3 = 'Media & Technology',
    subsection4 = 'Food & Drink',
    subsection5 = 'Services & Extras',
    subsection6 = 'Outdoor & View',
    subsection7 = 'Accessibility',
    subsection8 = 'Entertainment & Family Services',    

    getItemsErrorMessage = 'There was an error trying to get items of Amenities',
    messageErrorSaveAmenities = 'There was an error trying to save your Amenities',
    messageErrorUpdateAmenities = 'There was an error trying to update your Amenities',
    messageSuccessFullSaveAmenities = 'Amenities has been saved successfully',
    messageSuccessFullUpdateAmenities = 'Amenities has been updated successfully',

    valueZero = 0,
    negativeValue = -1,
    requiredField = 'false',

    extrabeds = 'extrabeds',
    multipleSelectorAccordion = 'multipleSelectorAccordion'
}

export class AmenitiesSubsection {

    static subsections: Array<any> =[
        {title: AmenitiesEnum.subsection1, amenitiesList: Array <GenericModel>(), validator: AmenitiesEnum.requiredField },
        {title: AmenitiesEnum.subsection2, amenitiesList: Array <GenericModel>(), validator: AmenitiesEnum.requiredField },
        {title: AmenitiesEnum.subsection3, amenitiesList: Array <GenericModel>(), validator: AmenitiesEnum.requiredField },
        {title: AmenitiesEnum.subsection4, amenitiesList: Array <GenericModel>(), validator: AmenitiesEnum.requiredField },
        {title: AmenitiesEnum.subsection5, amenitiesList: Array <GenericModel>(), validator: AmenitiesEnum.requiredField },
        {title: AmenitiesEnum.subsection6, amenitiesList: Array <GenericModel>(), validator: AmenitiesEnum.requiredField },
        {title: AmenitiesEnum.subsection7, amenitiesList: Array <GenericModel>(), validator: AmenitiesEnum.requiredField },
        {title: AmenitiesEnum.subsection8, amenitiesList: Array <GenericModel>(), validator: AmenitiesEnum.requiredField }
    ];
}