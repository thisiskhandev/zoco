import { GenericModel } from '@shared/generic-model';

export class VehicleInfoEnum {

    static vehicleTypes: Array<GenericModel> = [
        GenericModel.createGenericModel( 1,  'All Terrain'    , '' ),
        GenericModel.createGenericModel( 2,  'Autocar bus', '' ),
        GenericModel.createGenericModel( 3,  'Compact Executive'         , '' ),
        GenericModel.createGenericModel( 4,  'Crossover'    , '' ),
        GenericModel.createGenericModel( 5,  'Executive', '' ),
        GenericModel.createGenericModel( 6,  'Family'         , '' ),
        GenericModel.createGenericModel( 7,  'Family / Ranch'    , '' ),
        GenericModel.createGenericModel( 8,  'Hatchback', '' ),
        GenericModel.createGenericModel( 9,  'Luxury 4x2'         , '' ),
        GenericModel.createGenericModel( 10, 'Luxury 4x4'    , '' ),
        GenericModel.createGenericModel( 11, 'Microcar', '' ),
        GenericModel.createGenericModel( 12, 'Midibus'         , '' ),
        GenericModel.createGenericModel( 13, 'Minibus'         , '' ),
        GenericModel.createGenericModel( 14, 'Minivan'         , '' ),
        GenericModel.createGenericModel( 15, 'Sedan'         , '' ),
        GenericModel.createGenericModel( 16, 'Sport'         , '' ),
        GenericModel.createGenericModel( 17, 'Sport Sedan'         , '' ),
        GenericModel.createGenericModel( 18, 'Two floor bus'         , '' ),
        GenericModel.createGenericModel( 19, 'Van'         , '' ),
        GenericModel.createGenericModel( 20, 'Van / passengers'         , '' ),

      ];  
    
     static vehicleCategories: Array<GenericModel> = [
        GenericModel.createGenericModel( 1, 'Bus'  , '' ),
        GenericModel.createGenericModel( 2, 'Car'  , '' ),
        GenericModel.createGenericModel( 3, 'Truck', '' ),
      ];  

      static vehicleBelongingTypes: Array<GenericModel> = [
        GenericModel.createGenericModel( 1, 'Own Fleet Vehicles'  , '' ),
        GenericModel.createGenericModel( 2, 'Third Party Vehicles'  , '' ),
      ];

      static category=  'category'; 
      static type=      'type'; 
      static brand=     'brand'; 
      static model=     'model'; 
      static capacity=  'capacity'; 
      static quantity=  'quantity'; 
      static isPrivate= 'isPrivate'; 
      static ownedBy=   'ownedBy';
      static vehicleListVariableName = 'vehicleList';
      static isPrivateDefaultValue = false;
      static incompleteInfoMesssage = 'The information is not complete (Category, vehicle type, brand, model, capacity, number, transport type and property or belonging are required fields)';

}
