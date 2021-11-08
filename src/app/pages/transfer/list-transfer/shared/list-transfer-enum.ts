export enum ListTransferEnum {
    // rows
    company_name    = 'Company Name',
    address         = 'Home address',
    city            = 'City',
    state           = 'State',
    contact         = 'Contact person',
    total           = 'Total of vehicles',

    // columms
    company_col     = 'company_name',
    address_col     = 'home_address',
    city_col        = 'city',
    state_col       = 'state',
    contact_col     = 'contact_person',
    total_col       = 'total_vehicles',
    action_col      = 'action',
    id_col          = 'id',

    getListTransferErrorMessage = 'There was an error trying to get List Transfer Information',
    deleteMessage = 'Are you sure you want to delete \'',
    questionMark = '\'?',
    selectedTransferIdCookieName = 'selectedTransferId',
}
