//const serverUrl = 'http://zoco-api-test.usblick.com/';
const serverUrl = 'http://zoco-api-dev.usblick.com/';
const countriesRestUrl = 'https://restcountries.eu/rest/v2/';

export const Environment = {

  // Shared
  jsonContentType: 'application/json',
  contentTypeHeader: 'Content-Type',
  production: true,
  isNameAvailableApiUrl: serverUrl+'validateProviderName',

  // Hotel: Basic Information
  hotelApiUrl: serverUrl+'hotelServices',
  stablishmentTypeApiUrl: serverUrl+'establishmentTypeCatalogues',
  customerTypesApiUrl: serverUrl+'customerTypeCatalogues',
  countriesFilteredByCallingCodeApiUrl: countriesRestUrl+'callingcode/',
  countriesFilteredByNameApiUrl: countriesRestUrl+'name/',
  countriesApiUrl: countriesRestUrl+'all',
  isEstablishmentNameAvailableApiUrl: serverUrl+'hotelServices/isEstablishmentNameAvailable',
  categoryCataloguesUrl: serverUrl+'categoryCatalogues',

  // Hotel: General Description
  //     Internet
  internetConnectTypeUrl: serverUrl+'internetConnectTypeCatalogues',
  internetPlacesUrl: serverUrl+'internetPlaceCatalogues',
  //     Parking
  parkingAccessUrl: serverUrl+'parkingAccessCatalogues',
  parkingLocationsUrl: serverUrl+'parkingLocationCatalogues',
  parkingConditionUrl: serverUrl+'parkingConditionCatalogues',
  //    Breakfast
  breakfastTypeApiUrl: serverUrl+'breakfastCatalogues',
  //    Languages
  languagesApiUrl: serverUrl+'langCatalogues',
  //    Facilities
  facilitiesApiUrl: serverUrl+'facilityCatalogues',
  //    Save
  genDescApiUrl: serverUrl+'descriptionGenHotels',
    
  // Layout and pricing
  itemMeasureCatalogues: serverUrl + 'itemMeasureCatalogues',
  roomTypeCatalogues: serverUrl + 'roomTypeCatalogues',
  layoutApiUrl: serverUrl + 'roomPriceLayouts',
  
  roomNameApiUrl: serverUrl + 'roomNamesCatalogues',

  // Amenities
  itemsAmenities: serverUrl + 'amenitiesTypes',
  //    ChildrenAges
  childrenAgesCatalogues: serverUrl + 'childrenAgesCatalogues',
  //    Save
  amenitiesApiUrl: serverUrl+'amenitiesHotels',

  // Hotel Details
  hotelCompleteInfoApiUrl: serverUrl + 'hotelCompleteInfo/',
  
  //Payment and Policies 
  creditTypesApiUrl: serverUrl+ 'payCardsCatalogues',
  cancellationDaysApiUrl: serverUrl+ 'cancellationDaysCatalogues',  
  gracePeriodOptionsApiUrl: serverUrl+ 'graceTimePeriodCatalogues',
  fromTimeOptionsApiUrl: 'app/fromTimeOptions',
  toTimeOptionsApiUrl: 'app/toTimeOptions',
  petsAllowedCatalogues: serverUrl + 'petsAllowedCatalogues',
  petsChargesCatalogues: serverUrl + 'petsChargesCatalogues',
  savePoliciesPaymentApiUrl: serverUrl+ 'politicConditions',

  // Photos
  photoApiUrl: serverUrl + 'photoHotel',
  photoTransferApiUrl: serverUrl + 'photoTransfer',

  // Delete hotel
  deleteHotelApiUrl: serverUrl + 'hotelServices/',

  // Activities
  //   Search Location
  searchLocationApiUrl: serverUrl + 'searchLocation/',
  //   Type of Activities
  activityTypeApiUrl : serverUrl + 'activityTypeCatalogue',
  //   Photos Activities
  photoActivityApiUrl : serverUrl + 'photoActivity',
  //   Create Activity
  activityApiUrl : serverUrl + 'activities',
  //   Policies and Payment
  policiesActivityApiUrl: serverUrl + 'activitiesPoliciesConditions',
  //   Rate and Price
  rateActivityApiUrl: serverUrl + 'activityRates',
  //   Activities List
  activitiesApiUrl: serverUrl + 'activitiesServices',
  //   Activity Details
  activityCompleteInfoApiUrl: serverUrl + 'activityCompleteInfo/',

  
  // Transfer
  //   Transfer List & Save Basic Info
  transferApiUrl: serverUrl + 'transferServices',
  //   Vehicles Features
  transferFeaturesApiUrl: serverUrl + 'vehiclesfeaturestransfer',
  //       Category vehicles
  carCategoriesApiUrl: serverUrl+'vehiclesCategoryCatalogue',
  //   Drivers
  driversTransferApiUrl: serverUrl+'transferDrivers',  
  //   Policies
  transferPoliciesApiUrl: serverUrl+'transferPolicies',
  //       Extra Charges
  extraChargesTransferApiUrl: serverUrl + 'showListExtraChargeTransfer',
  //   Settings
  settingsTransferApiUrl: serverUrl + 'transferServiceSettings',
  //   Rates
  rateTransferApiUrl: serverUrl + 'transferRate',
  //   Detail transfer
  transferCompleteInfoUrl: serverUrl + 'transferCompleteInfo',


  // Card Types  type: 1 = credit, type: 2 = debit
  cardTypesApiUrl: serverUrl+ 'payCardsCatalogues/type/',

  //Auth URL
  module: 'ZOCO',

  /*authApiUrl : 'http://auth-api.staging.usblick.com/api/',
  authAppUrl : 'http://auth.staging.usblick.com/#/home/', */
  
  authApiUrl : 'http://auth-api.dev.usblick.com/api/',
  authAppUrl : 'http://auth.dev.usblick.com/#/home/',

  ActivateGuard : false,
  
};
