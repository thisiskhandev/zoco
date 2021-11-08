import { GenericModel } from '@shared/generic-model';

export class CheckInCheckOutEnum {

    checkInFromTimeId : string = 'checkInFromTimeId';
    checkInToTimeId   : string = 'checkInToTimeId';
    checkOutFromTimeId: string = 'checkOutFromTimeId';
    checkOutToTimeId  : string = 'checkOutToTimeId';

    checkInFromTime  :string = 'checkInFromTime';
    checkInToTime    :string = 'checkInToTime';
    checkOutFromTime :string = 'checkOutFromTime';
    checkOutToTime   :string = 'checkOutToTime';

    static fromTimeIdDefaultValue = '14:00:00';
    static toTimeIdDefaultValue = '16:00:00';

    static fromAndToTimeOtherOptionId = '4';

    static timeSeparator = ':';

    timePickerMinuteSteps          : number = 30;
    timePickerHourSteps            : number = 1;
    timePickerInitMinute           : number = 0;
    timePickerFromCheckInInitHour  : number = 7;
    timePickerToCheckInInitHour    : number = 0;
    timePickerFromCheckOutInitHour : number  = 0;
    timePickerToCheckOutInitHour   : number = 7;
    static getCheckInTimeOptionsErrorMessage = 'There was an error trying to get Check-In Time Options List information';
    static getCheckOutTimeOptionsErrorMessage = 'There was an error trying to get Check-Out Time Options List information';

    toTimeOptions: Array<GenericModel> = [
        GenericModel.createGenericModel( 1, '12:00', '' ),
        GenericModel.createGenericModel( 2, '22:00', '' ),
        GenericModel.createGenericModel( 3, '00:00', '' ),
        GenericModel.createGenericModel( 4, 'Other', '' )
    ];

    fromTimeOptions: Array<GenericModel> = [
        GenericModel.createGenericModel( 1, '12:00', '' ),
        GenericModel.createGenericModel( 2, '14:00', '' ),
        GenericModel.createGenericModel( 3, '15:00', '' ),
        GenericModel.createGenericModel( 4, 'Other', '' )
    ];

    static dateDummy: string = '01/01/2011 ';
    static minimalTimeCharacters: number = 2;
    static timeCharacterComplement: string = '0';

    static checkInFromTimeIsGreaterThanCheckInToTimeError   = 'checkInFromTimeIsGreaterThanCheckInToTime';
    static checkOutFromTimeIsGreaterThanCheckOutToTimeError = 'checkOutFromTimeIsGreaterThanCheckOutToTime';

}