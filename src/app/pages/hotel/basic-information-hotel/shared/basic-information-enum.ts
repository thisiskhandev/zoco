export enum  BasicInformationEnum {
    
    title='Welcome Ernesto Montes!',
    subtitle='Start by telling us your property\'s address, type, name and contact details',

    //Form Control Column names
    id= 'id',
    appLocationComponentName ='app-location',
    appPropertyComponentName ='app-property',
    appContactDetailComponentName ='app-contactdetail',
    appChannelManagerComponentName ='app-channelmanager',

    //Form Control Default values
    emptyString = '',
    defaultDropdownSelection = 1,
    YES = 'YES',
    NO = 'NO',
    notEmptyMessage ='Cannot be empty',    

    //Form Control Column max sizes 
    inputMaxSize = 180,
    inputMaxSizeMessage = 'This field cannot have more than 180 characters',

    saveBasicInfoErrorMessage       =  'There was an error trying to save your basic information',
    updateBasicInfoErrorMessage     =  'There was an error trying to update your basic information',
    getCustomerTypesErrorMessage    =  'There was an error trying to get Customer Type List information',
    getStablishmentTypeErrorMessage =  'There was an error trying to get Establishment Type List information',
  
    saveBasicInfoSuccessfullMessage   = 'Hotel information has been saved successfully',
    updateBasicInfoSuccessfullMessage = 'Hotel information has been updated successfully',
    establishmentNameIsNoAvailableErrorMessage = 'The establishment name is not Available, please try again with another name',

    locationComponentIndex = 0,
    propertyComponentIndex = 1,
    contactDetailComponentIndex = 2,
    channelManagerComponentIndex = 3,

    childComponentQuantity = 3

}