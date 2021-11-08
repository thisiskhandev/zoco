export enum NavigatorActivitiesEnum {
    tabs = 'tabs',
    basicInformationStep = 1,
    newActivitysStep = 2,
    policiesAndPaymentStep = 3,
    ratesStep = 4,

    incompleteFormErrorMessage = 'Oops, the information you have entered is not complete',

    // TODO: Se cambia el redirect del detalle de activity a la lista porque aun no se tiene el servicio del api que devuelve el detalle del activity.
    //redirect = '/base-navigator/activities/view-details/',
    redirect = '/base-list/activities',
    valueOne = 1,
    valueZero = 0,
    negativeValue = -1,

    rates = 'rates',
}