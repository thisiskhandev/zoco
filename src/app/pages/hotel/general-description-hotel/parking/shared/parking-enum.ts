export enum ParkingEnum {
    hasParking =       'hasParking',
    parkingAccess =    'parkingAccess',
    parkingLocation =  'parkingLocation',
    parkingCondition = 'parkingCondition',
    paidParkingAccess =    'paidParkingAccess',
    paidParkingLocation =  'paidParkingLocation',
    paidParkingCondition = 'paidParkingCondition',
    parkingPrice = 'parkingPrice',
    parkingPaid = '2',
    parkingFree = '1',
    noParking = '0',

    getParkingAccessErrorMessage =  'There was an error trying to get Parking Access List information',
    getParkingLocationErrorMessage =  'There was an error trying to get Parking Locations List information',
    getParkingConditionsErrorMessage =  'There was an error trying to get Parking Conditions List information',
    
    //Form Control Default values
    trueString = 'true',
    falseString = 'false',
    defaultDropdownSelection = "0",
    defaultValue = 0,
   
    //Form Control Column max sizes
    parkingPriceInputMaxSize = 5
}
