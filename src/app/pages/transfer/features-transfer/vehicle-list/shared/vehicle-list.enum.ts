export class VehicleListEnum {

    static idColumnName          =   'ID';
    static categoryColumnName    =   'Category';
    static typeColumnName        =   'Type'    ;
    static brandColumnName       =   'Brand'   ;
    static modelColumnName       =   'Model'   ;
    static quantityColumnName    =   'Stock';
    static actionColumnName      =   'Action'  ;

    static columnNames: Array<string> = [
        'ID',
        'Category',
        'Type'    ,
        'Brand'   ,
        'Model'   ,
        'Stock',
        'Action'
    ];
    
    static index     = 'index';
    static category  = 'categoryName'; 
    static type      = 'typeDescription';     
    static brand     = 'brand';    
    static model     = 'modelType';    
    static capacity  = 'capacity'; 
    static quantity  = 'quantity'; 
    static isPrivate = 'isPrivate';
    static ownedBy   = 'ownedByDescription';  
    static valueOne  = 1;
    static valueTwo  = 2; 
}