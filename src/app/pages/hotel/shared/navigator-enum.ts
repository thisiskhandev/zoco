export enum NavigatorEnum {
    basicInformationStep = 1,
    propertyDetailsStep = 2,
    layoutAndPriceStep = 3,
    amenitiesStep = 4,
    photosStep = 5,
    paymentAndPoliciesStep = 6,


    incompleteFormErrorMessage = 'Oops, the information you have entered is not complete',

    //data dummy for hackToAnotherTab method
    establishmentIdDummy = 1,
    establishmentNameDummy = 'Establishmen generic name',
    establishmentTotalRoomsDummy = 1000,

    errorMessage = 'There was an error trying to save your information',

    redirect = '/base-navigator/hotels/view-details/',
    valueOne = 1,
    valueZero = 0,


    selectedEstablishmentIdCookieName = 'selectedEstablishmentId',
    hotelCompleteInfoVariableName = 'hotelCompleteInfo',
    dialogTimeOut = 1
}