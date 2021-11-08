import { CheckInCheckOutEnum } from './check-in-check-out.enum';
import { GenericFormModel } from '@shared/generic-form-model';
import { TimePickerModel } from '@hotel/payment-policies-hotel/check-in-check-out/shared/time-picker.model';

export class CheckInCheckOutModel implements GenericFormModel { 
    id : number;
    checkInFromTime: string = CheckInCheckOutEnum.fromTimeIdDefaultValue;
    checkInToTime: string = CheckInCheckOutEnum.toTimeIdDefaultValue;
    checkOutFromTime: string = CheckInCheckOutEnum.fromTimeIdDefaultValue;
    checkOutToTime: string = CheckInCheckOutEnum.toTimeIdDefaultValue;
    
    // Se guardan los ID de los datos de check in y check out para mostrarlos en la vista
    checkInFromTimeId : string;
    checkInToTimeId : string;
    checkOutFromTimeId : string;
    checkOutToTimeId : string;
    // Datos del picker
    initTimePickerFromCheckIn: TimePickerModel;
    initTimePickerToCheckIn: TimePickerModel;
    initTimePickerFromCheckOut: TimePickerModel;
    initTimePickerToCheckOut: TimePickerModel;

    constructor() {
        this.id = null;
        this.checkInFromTime = CheckInCheckOutEnum.fromTimeIdDefaultValue;
        this.checkInToTime = CheckInCheckOutEnum.toTimeIdDefaultValue;
        this.checkOutFromTime = CheckInCheckOutEnum.fromTimeIdDefaultValue;
        this.checkOutToTime = CheckInCheckOutEnum.toTimeIdDefaultValue;

        // Se inicializan los ID en null para evitar fallas en el modelo
        this.checkInFromTimeId = null;
        this.checkInToTimeId = null;
        this.checkOutFromTimeId = null;
        this.checkOutToTimeId = null;
        // Datos del picker
        this.initTimePickerFromCheckIn = null;
        this.initTimePickerToCheckIn = null; 
        this.initTimePickerFromCheckOut = null;
        this.initTimePickerToCheckOut = null;
    }

    setData() {}
}