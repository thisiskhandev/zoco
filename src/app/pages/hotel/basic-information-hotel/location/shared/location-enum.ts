export enum  LocationEnum {

    // Google Maps Fields BasicInformationEnum
    googleMapLocation = 'location',
    googleMapLocality = 'locality',
    googleMapAdminArea = 'administrative_area_level_1',
    googleMapPostalCode = 'postal_code',
    googleMapParent = 'parent',
    googleMapClickEvent = 'click',
    googleMapGeoCode = 'geocode',
    googleMapPlaceChanged = 'place_changed',
    googleMapFirstArrayPosition = 0,
    googleMapOkStatus = 'OK',
    googleMapInitialZoom = 1,
    googleMapStringSeparator = ', ',
    googleMapNoResultMsg = 'No results found',
    googleMapGeoCoderFaildMsg = 'Geocoder failed due to: ',
    googleMapAdminAreaTwo = 'administrative_area_level_2',
    googleMapFinalZoom = 14,
    googleMapGmap = 'gmap',
    googleMapAutoComplete = 'autocomplete',
    googleMapLongName = 'long_name',
    googleMapShortName = 'short_name',
    googleMapSublocalityLvlOne = 'sublocality_level_1',

    //Form Control Column names
    locatedTitle = 'Where\'s your property located?',
    locationReference= 'locationReference',
    home_address= 'home_address',
    city= 'city',
    cityLabel='cityLabel',
    state= 'state',
    stateLabel= 'stateLabel',
    country= 'country',
    iataCode='iataCode',
    countryLabel= 'countryLabel',
    zipCode= 'zipCode',
    geo_coordinates= 'geo_coordinates',
    coordinatesLabel= 'coordinatesLabel',
    locationLabel= 'Location: ',
    autocompletePlaceHolderMessage = 'Search location',
    streetAddressLabel= 'Street address: ',
    addressPlaceHolderMessage = 'Address',
    referencePlaceHolderMessage = 'Write a location reference',
    referenceLabel = 'Location Reference: ',
    countryRegionLabel= 'Country/Region: ',
    stateMessageLabel = 'State: ',
    cityMessageLabel = 'City: ',
    coordinatesMessageLabel = 'Coordinates: ',
    zipMessageLabel = 'Zip Code: ',
    yourAddressMessage = 'Your Address Matters',
    cardTextMessage = 'Make sure you enter the full address of your property including building name, number, etc. Base on the info you provide, we might send a letter to verify this address.',
    zipCodePlaceHolder = 'Zip code',
    statePlaceHolder = 'State',
    cityPlaceHolder = 'City',
    coordinatesPlaceHolder = 'Coordinates',

    //Form Control Column max sizes 
    locationReferenceMaxSize = 70,
    zipCodeInputMaxSize = 11,
    cityInputMaxSize = 70,
    stateInputMaxSize = cityInputMaxSize,
    countryInputMaxSize = cityInputMaxSize,
 

    //Form Control Default values
    emptyString = '',
    errorColor = 'red',
    origColor = '#666666',

    defaultGeoPosition = "38.21720597640818, -79.37147702883607",
    
    childComponentQuantity = 6

}