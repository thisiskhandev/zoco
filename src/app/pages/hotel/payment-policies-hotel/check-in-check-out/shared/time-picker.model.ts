import { CheckInCheckOutEnum } from './check-in-check-out.enum';

export class TimePickerModel {
    hour: number;
    minute: number;

    static convertToString( timePickerModel: TimePickerModel): string {
        return TimePickerModel.complementTime(timePickerModel.hour)
            +CheckInCheckOutEnum.timeSeparator
            +TimePickerModel.complementTime(timePickerModel.minute);
    }

    static complementTime(time: number): string {
        let numberInString: string = String(time);
        if(numberInString.length < CheckInCheckOutEnum.minimalTimeCharacters) {
            numberInString = CheckInCheckOutEnum.timeCharacterComplement + numberInString;
        }
        return numberInString;
    }
}