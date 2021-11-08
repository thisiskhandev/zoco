export enum  RoomInfoEnum {
    roomTypeId  = 'roomTypeId',
    quantity    = 'quantity',
    customName    = 'customName',
    hasSmokingPolicy = 'hasSmokingPolicy',
    smokingPolicyDescription = 'smokingPolicyDescription',
    roomNameId = 'roomNameId',

    quantityMaxSize = 10,
    roomNameMaxSize = 180,
    smokingPolicyDescriptionMaxSize = 180,
    roomTypeQuantityMaxOptions = 10,

    defaultRoomTypeId = 0,
    defaultQuantity = 0,
    defaultSmokerPolicyId = 1,
    customNameDefaultValue = '',
    hasSmokingPolicyDefaultValue = 'false',
    smokingPolicyDescriptionDefaultValue = '',
    roomNameDefaultValue = 0,

    getBedMeasuresErrorMessage = 'There was an error trying to get Bed and SofaBed Measures List information',
    getRoomTypesErrorMessage = 'There was an error trying to get Room Types information',
    getRoomNamesErrorMessage = 'There was an error trying to get Room Names information',
}