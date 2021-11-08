export enum ViewDetailsActivityEnum {
    title = 'Activity Details View',

    id = 'idItem',
    activityErrorMessage = 'There was an error trying to get Activity Details',
    unionHour = ' to ',

    valueOne = 1,
    valueZero = 0,
    stringSeparator = ', ',
    space = ' ',
}

// TODO: Esta clase debe ser eliminada cuando se tenga el servicio del api que devuelve esta informacion.
export class DataDummyActivities {
    static createJson() {
        const activityCompleteInfo = 
        {  
            "basicInfo": {
                "generalInfo": {
                    "providerName":"proveedor",
                    "fiscalData":"datos fiscales",
                    "homeAddress":"direccion",
                    "country":"pais",
                    "state":"estado",
                    "city":"estado",
                    "zipCode":"codigo postal",
                    "email":"algunacosa@hotmail.com",
                    "responsibleName":"nombre del responsable",
                    "phoneNumber":[  
                        "+33-2896",
                        "+39-123",
                        "+972-952",
                        "+1-0236",
                        "+34-723"
                    ]
                },
                "contactInfo":[  
                    {  
                        "type":"1",
                        "contactName":"Contacto 1",
                        "email":"contacto1@dominio.com",
                        "phoneNumber":[  
                            "+1684-96"
                        ]
                    },                  
                ],
            },
            "activities": {
                "id": null,
                "activityId": 1,
                "activityInfo": {
                    "id":null,
                    "destination": "ORL",
                    "duration":"3",
                    "highlightTypes":[
                        {
                            "id":"1",
                            "description":"Transport included",
                        },
                        {
                            "id":"2",
                            "description":"Meals included",
                        },
                    ],
                    "name":"3 Days in Orlando",
                    "schedule": {
                        "id":"3",
                        "description":"All Day",
                    },
                    "timeOption": {
                        "id":"2",
                        "description":"Days",
                    },
                    "validFrom":"2018-06-01",
                    "validUntil":"2018-12-31",
                },
                "features":{
                    "id":null,
                    "langs": [
                        {
                            "id": 1,
                            "description": "Spanish or Castilian",
                            "iso_codelang": "es"
                        },                        
                        {
                            "id": 4,
                            "description": "English",
                            "iso_codelang": "en"
                        },
                    ],
                    "location": {
                        "id":"2",
                        "description":"Activity Place",
                    },
                    "pickTo":"17:00",
                    "pickUp":"09:00",
                    "type":{
                        "id":"1",
                        "description":"City Tour",
                    },
                },
                "generalDescription": {
                    "description":"For most people, any mention of Orlando immediately conjures up images of sprawling theme parks filled with characters plucked right out of popular animated movies. Escape the urban bustle at Ellie Schiller Homosassa Springs Wildlife State Park and Stand-Up Paddleboarding. Popular historic sites such as Ponce de Leon Inlet Lighthouse & Museum and Stetson Mansion are in your itinerary. Get out of town with these interesting Orlando side-trips: Titusville (American Space Museum & Space Walk of Fame & NASA Kennedy Space Center Visitor Complex), Olde Mill House Gallery and Printing Museum (in Homosassa) and Beach at Daytona Beach (in Daytona Beach). There's lots more to do: tour the pleasant surroundings at Cocoa Beach, see the interesting displays at Ripley's Believe It or Not! Orlando, look for gifts at The Rustic Rose, and get curious at Marine Science Center.",
                    "id":null,
                    "tips":"1. PLAN what you want to do in advance\n 2. BUY your attraction tickets in advance\n 3. MULTI-DAY and combo tickets are much better value than single-day tickets\n 4. SCHEDULE Your Visit for the Spring or Autumn Seasons\n 5. PREPARE for the tropical weather\n 6. PACE yourselves \n 7. FLORIDA'S theme parks are huge!\n 8. LITTLE ONES will get worn out!\n 9. ARRIVE as early as possible\n 10. DINING outside the theme parks saves money\n"
                    // Fotos
                },
                "itinerary": {
                    "id":null,
                    "subActivitiesList":[
                        { 
                            "id":"1",
                            "date":"2018-08-25", 
                            "details":"Magic Kingdom is a theme park at the Walt Disney World Resort in Bay Lake, Florida, near Orlando. Owned and operated by The Walt Disney Company through its Parks, Experiences and Consumer Products division, the park opened on October 1, 1971, as the first of four theme parks at the resort. Initialized by Walt Disney and designed by WED Enterprises, its layout and attractions are based on Disneyland Park in Anaheim, California, and is dedicated to fairy tales and Disney characters.", 
                            "endTime":"17:30", 
                            "startTime":"8:30", 
                            "subActivityName":"Magic Kingdom Park",
                            "ratesList": [
                                {
                                    "id":"10",
                                    "nameSubActivity": "Magic Kingdom Park", 
                                    "idPersonType": "1", 
                                    "namePersonType": "Adult", 
                                    "price": "300", 
                                    "excludeTaxes": { 
                                        "excludeTax":"true", 
                                        "typeTax":[1]
                                    }
                                },
                                {
                                    "id":"11",
                                    "nameSubActivity": "Magic Kingdom Park", 
                                    "idPersonType": "2", 
                                    "namePersonType": "Children", 
                                    "price": "200", 
                                    "excludeTaxes": {
                                        "excludeTax":"true", 
                                        "typeTax":[1, 2]
                                    } 
                                },
                                {
                                    "id":"12",
                                    "nameSubActivity": "Magic Kingdom Park", 
                                    "idPersonType": "3", 
                                    "namePersonType": "Infant", 
                                    "price": "50", 
                                    "excludeTaxes": {
                                        "excludeTax":"true", 
                                        "typeTax": [1, 2]
                                    } 
                                }
                            ]
                        },
                        { 
                            "id":"2",
                            "date":"2018-08-26", 
                            "details":"Universal's Islands of Adventure (formally called Universal Studios Islands of Adventure and often shortened to Islands of Adventure) is a theme park located in Orlando, Florida. It opened on May 28, 1999, along with CityWalk, as part of an expansion that converted Universal Studios Florida into the Universal Orlando Resort. The resort's slogan Vacation Like You Mean It was introduced in 2013.", 
                            "endTime":"17:00", 
                            "startTime":"08:00", 
                            "subActivityName":"Island of Adventure",
                            "ratesList": [
                                {	"id":"13",
                                    "nameSubActivity": "Island of Adventure", 
                                    "idPersonType": "1", 
                                    "namePersonType": "Adult", 
                                    "price": "350", 
                                    "excludeTaxes": {
                                        "excludeTax":"true", 
                                        "typeTax": [1, 2]
                                    } 
                                },
                                {
                                    "id":"14",
                                    "nameSubActivity": "Island of Adventure", 
                                    "idPersonType": "2", 
                                    "namePersonType": "Children", 
                                    "price": "300", 
                                    "excludeTaxes": {
                                        "excludeTax":"false", 
                                        "typeTax":[]
                                    } 
                                },
                            ]
                        },
                        { 
                            "id":"3",
                            "date":"2018-08-27", 
                            "details":"Disney's Hollywood Studios is a theme park at the Walt Disney World Resort in Bay Lake, Florida, near Orlando. It is owned and operated by The Walt Disney Company through its Parks, Experiences and Consumer Products division. Based on a concept by Marty Sklar, Randy Bright, and Michael Eisner, the park opened on May 1, 1989, as the Disney-MGM Studios Theme Park, and was the third of four theme parks built at Walt Disney World. Spanning 135 acres (55 ha), the park is dedicated to the imagined worlds from film, television, music, and theatre, drawing inspiration from the Golden Age of Hollywood.", 
                            "endTime":"18:00", 
                            "startTime":"08:00", 
                            "subActivityName":"Disney's Hollywood Studios",
                            "ratesList": [
                                {	"id":"15",
                                    "nameSubActivity": "Disney's Hollywood Studios", 
                                    "idPersonType": "1", 
                                    "namePersonType": "Adult", 
                                    "price": "280", 
                                    "excludeTaxes": {
                                        "excludeTax":"true", 
                                        "typeTax": [1, 2]
                                    } 
                                },
                                {
                                    "id":"16",
                                    "nameSubActivity": "Disney's Hollywood Studios", 
                                    "idPersonType": "2", 
                                    "namePersonType": "Children", 
                                    "price": "250", 
                                    "excludeTaxes": {
                                        "excludeTax":"false", 
                                        "typeTax":[]
                                    } 
                                }
                            ]
                        }
                    ]
                }
            },
            "policiesPayment": {
                "activityId":1,
                "ageRange": { 
                    "adultAge":"13",
                    "childrenAgeFrom":"3",
                    "childrenAgeUp":"12",
                    "infantAgeFrom":"0",
                    "infantAgeUp":"2",
                },
                "paymentMethods": {
                    "acceptCreditCard":true,
                    "acceptDebitCard":true,
                    "creditCardType": [1, 2, 3, 4, 5, 6],
                    "debitCardType": [1, 2, 3],
                    "hasPaymentMethods":"true",
                },
                "taxesSetup": {
                    "amountCityTax":"7",
                    "cityTax":"true",
                    "percentageVat":"1",
                    "vatTax":"true",
                }
            },
            "ratesPrices": {
                "activityId":1,
                "ratesList": [
                    {
                        "id":"10",
                        "nameSubActivity": "Magic Kingdom Park", 
                        "idPersonType": "1", 
                        "namePersonType": "Adult", 
                        "price": "300", 
                        "excludeTaxes": { 
                            "excludeTax":"true", 
                            "typeTax":[1]
                        }
                    },
                    {
                        "id":"11",
                        "nameSubActivity": "Magic Kingdom Park", 
                        "idPersonType": "2", 
                        "namePersonType": "Children", 
                        "price": "200", 
                        "excludeTaxes": {
                            "excludeTax":"true", 
                            "typeTax":[1, 2]
                        } 
                    },
                    {
                        "nameSubActivity": "Magic Kingdom Park", 
                        "idPersonType": "3", 
                        "namePersonType": "Infant", 
                        "price": "50", 
                        "excludeTaxes": {
                            "excludeTax":"true", 
                            "typeTax": [1, 2]
                        } 
                    },
                    {	
                        "nameSubActivity": "Island of Adventure", 
                        "idPersonType": "1", 
                        "namePersonType": "Adult", 
                        "price": "350", 
                        "excludeTaxes": {
                            "excludeTax":"true", 
                            "typeTax": [1, 2]
                        } 
                    },
                    {
                        "nameSubActivity": "Island of Adventure", 
                        "idPersonType": "2", 
                        "namePersonType": "Children", 
                        "price": "300", 
                        "excludeTaxes": {
                            "excludeTax":"false", 
                            "typeTax":[]
                        } 
                    },
                    {	
                        "nameSubActivity": "Disney's Hollywood Studios", 
                        "idPersonType": "1", 
                        "namePersonType": "Adult", 
                        "price": "280", 
                        "excludeTaxes": {
                            "excludeTax":"true", 
                            "typeTax": [1, 2]
                        } 
                    },
                    {
                        "nameSubActivity": "Disney's Hollywood Studios", 
                        "idPersonType": "2", 
                        "namePersonType": "Children", 
                        "price": "250", 
                        "excludeTaxes": {
                            "excludeTax":"false", 
                            "typeTax":[]
                        } 
                    }
                ]
            }           
            
        }

        return activityCompleteInfo;
    }
}