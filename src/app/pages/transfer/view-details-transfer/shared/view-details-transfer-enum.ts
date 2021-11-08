export enum ViewDetailsTransferEnum {
    title = 'Transfer Details View',
    subTitle = '',

    id = 'idItem',
    getDetailTransferErrorMessage = 'There was an error trying to get transfer Details',
}

// TODO: Esta clase debe ser eliminada cuando se tenga el servicio del api que devuelve esta informacion completa.
export class DataDummyTransfer {
    static createJson() {
        const transferCompleteInfo = 
        {
            "basicInfo": {
                "id": 1,
                "nameDetails": {
                    "name": "BE QUICK ,TRANSFERS",
                    "fiscalData": "datos fiscales"
                },
                "addressInfo": {
                    "city": "Sss",
                    "address": "Bogotá",
                    "country": "Pais",
                    "state": "Estado",
                    "zip": "9"
                },
                "contactPhones": {
                    "email": "jgarcia@acorde.com.ve",
                    "responsibleName": "Nombre Del Responsable",
                    "officePhone": {
                        "id": 7,
                        "phone_number": "+358-8"
                    },
                    "twentyFourHourPhone": {
                        "id": 8,
                        "phone_number": "+374-5"
                    }
                },
                "category": {
                    "id": 8,
                    "category_name": "Transfers"
                },
                "totalVehicles": 9,
                "contactInfo": [
                    {
                        "id": 6,
                        "transfer_service_id": 4,
                        "contact_name": "dfs",
                        "email": "jgarcia@acorde.com.ve",
                        "phone": "+358-952",
                        "contact_type": {
                            "id": 1,
                            "name": "Administrative"
                        },
                        "deleted_at": null
                    }
                ]
            },
            "vehiclesFeatures": {
                "transferServiceId": "1",
                // TODO: El api no devuelve la informacion del transportType (privated, regular)
                "vehiclesInfo": [
                    {
                        "id": 11,
                        "index": 11,
                        "category": 3,
                        "categoryName": "Car",
                        "type": 6,
                        "typeDescription": "Executive",
                        "brand": "Ford",
                        "modelType": "Explorer",
                        "capacity": 5,
                        "quantity": 3,
                        "isPrivate": 2,
                        "ownedBy": 1,
                        "ownedDescription": "Own Fleet Vehicles",
                        "transportType":"Privated" // TODO: Agregar este campo en el json
                    },
                    {
                        "id": 12,
                        "index": 12,
                        "category": 3,
                        "categoryName": "Car",
                        "type": 1,
                        "typeDescription": "Microcar",
                        "brand": "Chevrolet",
                        "modelType": "Tahoe",
                        "capacity": 5,
                        "quantity": 10,
                        "isPrivate": 2,
                        "ownedBy": 1,
                        "ownedDescription": "Own Fleet Vehicles",
                        "transportType":"Privated"
                    },
                    {
                        "id": 13,
                        "index": 13,
                        "category": 1,
                        "categoryName": "Bus",
                        "type": 14,
                        "typeDescription": "Family \/ ranch",
                        "brand": "Ford",
                        "modelType": "Transit\/wagon",
                        "capacity": 10,
                        "quantity": 8,
                        "isPrivate": 1,
                        "ownedBy": 2,
                        "ownedDescription": "Third Party Vehicles",
                        "transportType":"Regular"
                    },
                    {
                        "id": 14,
                        "index": 14,
                        "category": 1,
                        "categoryName": "Bus",
                        "type": 13,
                        "typeDescription": "Luxury 4x2",
                        "brand": "Volvo",
                        "modelType": "8400 City Bus",
                        "capacity": 30,
                        "quantity": 3,
                        "isPrivate": 1,
                        "ownedBy": 1,
                        "ownedDescription": "Own Fleet Vehicles",
                        "transportType":"Regular"
                    },
                    {
                        "id": 15,
                        "index": 15,
                        "category": 1,
                        "categoryName": "Bus",
                        "type": 2,
                        "typeDescription": "Hatchback ",
                        "brand": "Volvo",
                        "modelType": "7700 H",
                        "capacity": 30,
                        "quantity": 3,
                        "isPrivate": 1,
                        "ownedBy": 2,
                        "ownedDescription": "Third Party Vehicles",
                        "transportType":"Regular"
                    },
                    {
                        "id": 16,
                        "index": 16,
                        "category": 2,
                        "categoryName": "Truck",
                        "type": 5,
                        "typeDescription": "Crossover",
                        "brand": "Volkswagen",
                        "modelType": "Bora",
                        "capacity": 4,
                        "quantity": 8,
                        "isPrivate": 2,
                        "ownedBy": 1,
                        "ownedDescription": "Own Fleet Vehicles",
                        "transportType":"Privated"
                    },
                    {
                        "id": 17,
                        "index": 17,
                        "category": 2,
                        "categoryName": "Truck",
                        "type": 9,
                        "typeDescription": "Sports",
                        "brand": "Volkswagen",
                        "modelType": "Vento",
                        "capacity": 4,
                        "quantity": 3,
                        "isPrivate": 2,
                        "ownedBy": 1,
                        "ownedDescription": "Own Fleet Vehicles",
                        "transportType":"Privated"
                    },
                    {
                        "id": 18,
                        "index": 18,
                        "category": 2,
                        "categoryName": "Truck",
                        "type": 15,
                        "typeDescription": "Luxury 4x4",
                        "brand": "Audi",
                        "modelType": "A3",
                        "capacity": 4,
                        "quantity": 4,
                        "isPrivate": 2,
                        "ownedBy": 2,
                        "ownedDescription": "Third Party Vehicles",
                        "transportType":"Privated"
                    },
                    {
                        "id": 19,
                        "index": 19,
                        "category": 2,
                        "categoryName": "Truck",
                        "type": 16,
                        "typeDescription": "Van \/ passengers",
                        "brand": "Audi",
                        "modelType": "A4",
                        "capacity": 4,
                        "quantity": 3,
                        "isPrivate": 2,
                        "ownedBy": 1,
                        "ownedDescription": "Own Fleet Vehicles",
                        "transportType":"Privated"
                    }
                ],
                "photos": [
                    {
                        "id": 58,
                        "imagePath": "http:\/\/res.cloudinary.com\/ang2rp\/image\/upload\/v1535467447\/Transfer\/4\/kg8j6br4cu5mmh46iiem.jpg"
                    }
                ]
            },
            "transferDrivers": {
                "transferServiceId": "1",
                "transferDrivers": [
                    {
                        "id": 1,
                        "birthday": "2018-08-08",
                        "contactPhone": [
                            "+1684-8"
                        ],
                        "driverLicenceId": "123",
                        "driverName": "Marty Friedman",
                        "languages": [
                            8,
                            5
                        ],
                        "periodToworkFrom": "3",
                        "periodToworkTo": "5",
                        "vehiclesTypes": [
                            1,
                            3
                        ]
                    },
                    {
                        "id": 2,
                        "birthday": "2018-08-08",
                        "contactPhone": [
                            "+1684-8"
                        ],
                        "driverLicenceId": "123",
                        "driverName": "Phillip Campbel",
                        "languages": [
                            8,
                            5
                        ],
                        "periodToworkFrom": "3",
                        "periodToworkTo": "5",
                        "vehiclesTypes": [
                            1,
                            3
                        ]
                    },
                    {
                        "id": 3,
                        "birthday": "2018-08-08",
                        "contactPhone": [
                            "+1684-8"
                        ],
                        "driverLicenceId": "123",
                        "driverName": "Mike Stern",
                        "languages": [
                            8,
                            5
                        ],
                        "periodToworkFrom": "3",
                        "periodToworkTo": "5",
                        "vehiclesTypes": [
                            1,
                            3
                        ]
                    },
                    {
                        "id": 4,
                        "birthday": "2018-08-08",
                        "contactPhone": [
                            "+1684-8"
                        ],
                        "driverLicenceId": "123",
                        "driverName": "Janick Hers",
                        "languages": [
                            8,
                            5
                        ],
                        "periodToworkFrom": "3",
                        "periodToworkTo": "5",
                        "vehiclesTypes": [
                            1,
                            3
                        ]
                    }
                ]
            },
            "settings": {
                "transferServiceId" : "1",
                "settingsList" : [
                    {
                        "id":1,
                        "vehicleFeatureId":"11",
                        "vehiclePlate":"ABC-123",
                        "haveChildren":"Yes",
                        "allowPets":"No",
                        "doorToDoor":"Yes",
                        "stopsOrPickups":"0",
                        "availableHours":"24",
                        "availableDays":"7",
                        "transferDriverId": {
                            "id": "1",
                            "name": "Marty Friedman"
                        },
                        "bagWeight":"25",                        
                        "bagLength":"8",                        
                        "bagWidth":"6",
                        "bagHeight":"6",
                        "scheduleType":"Day",
                        "vehicleType":""
                    },
                    {
                        "id":2,
                        "vehicleFeatureId":"11",
                        "vehiclePlate":"DEF-123",
                        "haveChildren":"Yes",
                        "allowPets":"Yes",
                        "doorToDoor":"Yes",
                        "stopsOrPickups":"0",
                        "availableHours":"6",
                        "availableDays":"7",
                        "transferDriverId": {
                            "id": "2",
                            "name": "Phillip Campbel"
                        },
                        "bagWeight":"20",                        
                        "bagLength":"7",                        
                        "bagWidth":"2",
                        "bagHeight":"4",
                        "scheduleType":"Night",
                        "vehicleType":""
                    },
                    {
                        "id":3,
                        "vehicleFeatureId":"11",
                        "vehiclePlate":"GHI-123",
                        "haveChildren":"Yes",
                        "allowPets":"No",
                        "doorToDoor":"Yes",
                        "stopsOrPickups":"0",
                        "availableHours":"24",
                        "availableDays":"7",
                        "transferDriverId": {
                            "id": "3",
                            "name": "Mike Stern"
                        },
                        "bagWeight":"30",                        
                        "bagLength":"10",                        
                        "bagWidth":"9",
                        "bagHeight":"14",
                        "scheduleType":"Day",
                        "vehicleType":""
                    },
                    {
                        "id":4,
                        "vehicleFeatureId":"12",
                        "vehiclePlate":"JKL-123",
                        "haveChildren":"No",
                        "allowPets":"No",
                        "doorToDoor":"No",
                        "stopsOrPickups":"0",
                        "availableHours":"24",
                        "availableDays":"7",
                        "transferDriverId": {
                            "id": "1",
                            "name": "Marty Friedman"
                        },
                        "bagWeight":"15",                        
                        "bagLength":"6",                        
                        "bagWidth":"3",
                        "bagHeight":"2",
                        "scheduleType":"Day",
                        "vehicleType":""
                    },
                    {
                        "id":5,
                        "vehicleFeatureId":"12",
                        "vehiclePlate":"PQR-123",
                        "haveChildren":"Yes",
                        "allowPets":"Yes",
                        "doorToDoor":"Yes",
                        "stopsOrPickups":"0",
                        "availableHours":"24",
                        "availableDays":"3",
                        "transferDriverId": {
                            "id": "2",
                            "name": "Phillip Campbel"
                        },
                        "bagWeight":"5",                        
                        "bagLength":"5",                        
                        "bagWidth":"5",
                        "bagHeight":"5",
                        "scheduleType":"Night",
                        "vehicleType":""
                    },
                    {
                        "id":6,
                        "vehicleFeatureId":"13",
                        "vehiclePlate":"STU-123",
                        "haveChildren":"Yes",
                        "allowPets":"Yes",
                        "doorToDoor":"No",
                        "stopsOrPickups":"0",
                        "availableHours":"24",
                        "availableDays":"3",
                        "transferDriverId": {
                            "id": "4",
                            "name": "Janick Hers"
                        },
                        "bagWeight":"15",                        
                        "bagLength":"15",                        
                        "bagWidth":"15",
                        "bagHeight":"15",
                        "scheduleType":"Day",
                        "vehicleType":""
                    },
                    {
                        "id":7,
                        "vehicleFeatureId":"14",
                        "vehiclePlate":"VWX-123",
                        "haveChildren":"Yes",
                        "allowPets":"Yes",
                        "doorToDoor":"Yes",
                        "stopsOrPickups":"0",
                        "availableHours":"24",
                        "availableDays":"7",
                        "transferDriverId": {
                            "id": "4",
                            "name": "Janick Hers"
                        },
                        "bagWeight":"27",                        
                        "bagLength":"18",                        
                        "bagWidth":"16",
                        "bagHeight":"11",
                        "scheduleType":"Night",
                        "vehicleType":""
                    },
                    {
                        "id":8,
                        "vehicleFeatureId":"14",
                        "vehiclePlate":"YZA-123",
                        "haveChildren":"No",
                        "allowPets":"No",
                        "doorToDoor":"No",
                        "stopsOrPickups":"0",
                        "availableHours":"24",
                        "availableDays":"6",
                        "transferDriverId": {
                            "id": "3",
                            "name": "Mike Stern"
                        },
                        "bagWeight":"30",                        
                        "bagLength":"11",                        
                        "bagWidth":"13",
                        "bagHeight":"12",
                        "scheduleType":"Day",
                        "vehicleType":""
                    },
                    {
                        "id":9,
                        "vehicleFeatureId":"15",
                        "vehiclePlate":"BCD-456",
                        "haveChildren":"No",
                        "allowPets":"Yes",
                        "doorToDoor":"No",
                        "stopsOrPickups":"0",
                        "availableHours":"24",
                        "availableDays":"5",
                        "transferDriverId": {
                            "id": "3",
                            "name": "Mike Stern"
                        },
                        "bagWeight":"30",                        
                        "bagLength":"11",                        
                        "bagWidth":"13",
                        "bagHeight":"12",
                        "scheduleType":"Day",
                        "vehicleType":""
                    },
                    {
                        "id":10,
                        "vehicleFeatureId":"16",
                        "vehiclePlate":"HIJ-456",
                        "haveChildren":"Yes",
                        "allowPets":"No",
                        "doorToDoor":"Yes",
                        "stopsOrPickups":"0",
                        "availableHours":"18",
                        "availableDays":"6",
                        "transferDriverId": {
                            "id": "2",
                            "name": "Phillip Campbel"
                        },
                        "bagWeight":"10",                        
                        "bagLength":"22",                        
                        "bagWidth":"11",
                        "bagHeight":"33",
                        "scheduleType":"Night",
                        "vehicleType":""
                    },
                    {
                        "id":11,
                        "vehicleFeatureId":"17",
                        "vehiclePlate":"KLM-456",
                        "haveChildren":"Yes",
                        "allowPets":"Yes",
                        "doorToDoor":"Yes",
                        "stopsOrPickups":"0",
                        "availableHours":"18",
                        "availableDays":"6",
                        "transferDriverId": {
                            "id": "3",
                            "name": "Mike Stern"
                        },
                        "bagWeight":"42",                        
                        "bagLength":"23",                        
                        "bagWidth":"24",
                        "bagHeight":"15",
                        "scheduleType":"Day",
                        "vehicleType":""
                    },
                    {
                        "id":12,
                        "vehicleFeatureId":"17",
                        "vehiclePlate":"NOP-456",
                        "haveChildren":"Yes",
                        "allowPets":"No",
                        "doorToDoor":"Yes",
                        "stopsOrPickups":"0",
                        "availableHours":"24",
                        "availableDays":"6",
                        "transferDriverId": {
                            "id": "1",
                            "name": "Marty Friedman"
                        },
                        "bagWeight":"20",                        
                        "bagLength":"20",                        
                        "bagWidth":"20",
                        "bagHeight":"20",
                        "scheduleType":"Night",
                        "vehicleType":""
                    },
                    {
                        "id":13,
                        "vehicleFeatureId":"18",
                        "vehiclePlate":"QRS-456",
                        "haveChildren":"Yes",
                        "allowPets":"Yes",
                        "doorToDoor":"Yes",
                        "stopsOrPickups":"0",
                        "availableHours":"24",
                        "availableDays":"7",
                        "transferDriverId": {
                            "id": "4",
                            "name": "Janick Hers"
                        },
                        "bagWeight":"17",                        
                        "bagLength":"13",                        
                        "bagWidth":"15",
                        "bagHeight":"10",
                        "scheduleType":"Day",
                        "vehicleType":""
                    },
                    {
                        "id":14,
                        "vehicleFeatureId":"19",
                        "vehiclePlate":"TUV-456",
                        "haveChildren":"Yes",
                        "allowPets":"No",
                        "doorToDoor":"No",
                        "stopsOrPickups":"0",
                        "availableHours":"24",
                        "availableDays":"5",
                        "transferDriverId": {
                            "id": "1",
                            "name": "Marty Friedman"
                        },
                        "bagWeight":"24",                        
                        "bagLength":"18",                        
                        "bagWidth":"17",
                        "bagHeight":"20",
                        "scheduleType":"Night",
                        "vehicleType":""
                    },
                    {
                        "id":15,
                        "vehicleFeatureId":"15",
                        "vehiclePlate":"EFG-456",
                        "haveChildren":"No",
                        "allowPets":"No",
                        "doorToDoor":"No",
                        "stopsOrPickups":"0",
                        "availableHours":"12",
                        "availableDays":"5",
                        "transferDriverId": {
                            "id": "1",
                            "name": "Marty Friedman"
                        },
                        "bagWeight":"40",                        
                        "bagLength":"10",                        
                        "bagWidth":"10",
                        "bagHeight":"10",
                        "scheduleType":"Night",
                        "vehicleType":""
                    },
                    {
                        "id":16,
                        "vehicleFeatureId":"11",
                        "vehiclePlate":"XXE-456",
                        "haveChildren":"No",
                        "allowPets":"No",
                        "doorToDoor":"No",
                        "stopsOrPickups":"0",
                        "availableHours":"12",
                        "availableDays":"5",
                        "transferDriverId": {
                            "id": "1",
                            "name": "Marty Friedman"
                        },
                        "bagWeight":"40",                        
                        "bagLength":"10",                        
                        "bagWidth":"10",
                        "bagHeight":"10",
                        "scheduleType":"Night",
                        "vehicleType":""
                    },
                    {
                        "id":17,
                        "vehicleFeatureId":"11",
                        "vehiclePlate":"UPK-456",
                        "haveChildren":"Yes",
                        "allowPets":"No",
                        "doorToDoor":"No",
                        "stopsOrPickups":"0",
                        "availableHours":"12",
                        "availableDays":"7",
                        "transferDriverId": {
                            "id": "4",
                            "name": "Janick Hers"
                        },
                        "bagWeight":"40",                        
                        "bagLength":"10",                        
                        "bagWidth":"10",
                        "bagHeight":"10",
                        "scheduleType":"Night",
                        "vehicleType":""
                    },
                    {
                        "id":18,
                        "vehicleFeatureId":"11",
                        "vehiclePlate":"EVB-456",
                        "haveChildren":"Yes",
                        "allowPets":"Yes",
                        "doorToDoor":"Yes",
                        "stopsOrPickups":"0",
                        "availableHours":"24",
                        "availableDays":"7",
                        "transferDriverId": {
                            "id": "3",
                            "name": "Mike Stern"
                        },
                        "bagWeight":"35",                        
                        "bagLength":"23",                        
                        "bagWidth":"20",
                        "bagHeight":"18",
                        "scheduleType":"Day",
                        "vehicleType":""
                    },
                    {
                        "id":19,
                        "vehicleFeatureId":"11",
                        "vehiclePlate":"ZAW-456",
                        "haveChildren":"Yes",
                        "allowPets":"No",
                        "doorToDoor":"Yes",
                        "stopsOrPickups":"0",
                        "availableHours":"24",
                        "availableDays":"6",
                        "transferDriverId": {
                            "id": "2",
                            "name": "Phillip Campbel"
                        },
                        "bagWeight":"30",                        
                        "bagLength":"27",                        
                        "bagWidth":"13",
                        "bagHeight":"12",
                        "scheduleType":"Day",
                        "vehicleType":""
                    },
                    {
                        "id":20,
                        "vehicleFeatureId":"11",
                        "vehiclePlate":"FQH-456",
                        "haveChildren":"Yes",
                        "allowPets":"Yes",
                        "doorToDoor":"Yes",
                        "stopsOrPickups":"0",
                        "availableHours":"24",
                        "availableDays":"7",
                        "transferDriverId": {
                            "id": "1",
                            "name": "Marty Friedman"
                        },
                        "bagWeight":"28",                        
                        "bagLength":"16",                        
                        "bagWidth":"17",
                        "bagHeight":"10",
                        "scheduleType":"Day",
                        "vehicleType":""
                    }
                ]
                
            },
            "rates": [
                {
                    "id":1,
                    "bagsNumber":"4",
                    "destination":"Time Square",
                    "excludeTaxes": {
                        "excludeTax":"true", 
                        "typeTax":[
                            { 
                                "id":1,
                                "name": "City Tax"
                            }, 
                            { 
                                "id":2,
                                "name": "Vat Tax"
                            } 
                        ]
                    },
                    "extraChargesPrices":[
                        {
                            "id":1,
                            "name": "Extra time(minutes)",
                            "price":10,
                        },
                        {
                            "id":1,
                            "name": "Extra km",
                            "price":15,
                        },
                    ],
                    "handbagsNumber":"2",
                    "origin":"Central Park",
                    "peopleNumber":"4",
                    "price":"30",
                    "service": {
                        "id":"1",
                        "name":"One Way",
                    },
                    "vehicle": {
                        "id":"1",
                        "name":"Ford Transit"
                    }
                },
                {
                    "id":2,
                    "bagsNumber":"7",
                    "destination":"Radisson Resort",
                    "excludeTaxes": {
                        "excludeTax":"true", 
                        "typeTax":[
                            { 
                                "id":1,
                                "name": "City Tax"
                            }, 
                            { 
                                "id":2,
                                "name": "Vat Tax"
                            } 
                        ]
                    },
                    "extraChargesPrices":[
                        {
                            "id":1,
                            "name": "Extra time(minutes)",
                            "price":10,
                        },
                        {
                            "id":1,
                            "name": "Extra km",
                            "price":15,
                        },
                    ],
                    "handbagsNumber":"2",
                    "origin":"Orlando Int: Air",
                    "peopleNumber":"7",
                    "price":"50",
                    "service": {
                        "id":"2",
                        "name":"Round Trip",
                    },
                    "vehicle": {
                        "id":"2",
                        "name":"Audi A4"
                    }
                },
                {
                    "id":3,
                    "bagsNumber":"30",
                    "destination":"Time Square",
                    "excludeTaxes": {
                        "excludeTax":"true", 
                        "typeTax":[
                            { 
                                "id":1,
                                "name": "City Tax"
                            }, 
                            { 
                                "id":2,
                                "name": "Vat Tax"
                            } 
                        ]
                    },
                    "extraChargesPrices":[
                        {
                            "id":1,
                            "name": "Extra time(minutes)",
                            "price":10,
                        },
                        {
                            "id":1,
                            "name": "Extra km",
                            "price":15,
                        },
                    ],
                    "handbagsNumber":"2",
                    "origin":"Central Park",
                    "peopleNumber":"30",
                    "price":"40",
                    "service": {
                        "id":"2",
                        "name":"Round Trip",
                    },
                    "vehicle": {
                        "id":"3",
                        "name":"Volvo 7700H"
                    }
                }
            ]
        }
        return transferCompleteInfo;
    }
}
