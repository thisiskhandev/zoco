export enum  ContactDetailEnum {
    contactTitle = 'What are the contact details for this property?',
    leyendContact = 'ContactNumber (so we can assist with your registration when needed)',

    //Form Control Column names
    phone= 'phones',
    responsibleName= 'responsibleName',
    email= 'email',
    haveChannelManager= 'haveChannelManager',
    channelManagerName= 'channelManagerName',
    isCompanyManagement= 'isCompanyManagement',
    companyManagementName= 'companyManagementName',
    callingCode = 'callingCode',
    contactNameLabel = 'Contact Name: ',
    emailLabel = 'E-mail: ',
    phonesLabel = 'Phones: ', 
    responsibleNameInputPlaceHolder='Write a responsible name',
    emailInputPlaceHolder= 'Write an e-mail',
    provideValidEmailMessage= 'Provide a valid email',
    selectCodeMessage = '-- Select a calling code --',
    phoneNumberInputPlaceHolder = 'Write a phone number',
    selectCodeSpanMessage = 'Select a Calling Code',
    onlyNumbersMessage = 'Only numeric caracters',
    addPhoneMessage = 'Add Another Phone',
    propertyManagementQuestion = 'Are you a property management company, or part of a group or chain? ',
    companyNameLabel = 'Company Name: ',
    companyInputPlaceHolder= 'Write a company name',
    comercialContact = "cc",
    administrativeContact = "ca",
    payContact = "cp",
    reservationContact = "cr",

    //Form Control Default values
    emptyString = '',
    defaultDropdownSelection = 1,
    maxPhoneItems = 2,
    plus = '+',
    minus = '-',
    firstArrayPosition = 0,

    //Form Control Column max sizes 
    phoneNumberMaxSize = 20,
    inputMaxSize = 180,
    responsibleNameInputMaxSize = 70,
    emailInputMaxSize = 70,
    phoneMaxSizeMessage = 'This field cannot have more than 25 characters',

    // Generic form controls
    different_address = "different_address",
    home_address = "home_address",
    country = "country",
    state = "state",
    city = "city",
    zip = "zip",
    falseString = "false",
    trueString = "true",

    childComponentQuantity = 4,
    genericChildComponentQuantity = 2
}