import { CancellationOptionsEnum } from './cancellation-options.enum';
import { GenericFormModel } from '@shared/generic-form-model';

export class CancellationOptionsModel implements GenericFormModel {
    id : number;
    cancellationDays: number = CancellationOptionsEnum.cancellationDaysDefaultValue;
    penality: number = CancellationOptionsEnum.penaltyDefaultValue; 
    
    constructor() {
        this.id = null;
        this.cancellationDays = null;
        this.penality = null; 
    }

    setData() {}
}