export enum NavigatorTransferEnum {

    basicInformationStep = 0,
    featureStep = 1,
    driversStep = 2,
    policiesStep = 3,    
    ratesStep = 4,
    settingStep = 5, 

    incompleteFormErrorMessage = 'Oops, the information you have entered is not complete',
    one = 1,
    zero = 0,
    transferIdDummy = 1,
	negativeValue = -1,

	redirect = '/base-navigator/transfer/view-details/',
    features = 'features',
    settings = 'settings',
    drivers = 'drivers',
    rates = 'rates',
    errorMessage = 'There was an error trying to save your information',

    selectedTransferIdCookieName = 'selectedTransferId',
}
