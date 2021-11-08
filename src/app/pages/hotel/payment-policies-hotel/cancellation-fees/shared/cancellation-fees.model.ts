import { Utilities } from '@shared/utilities';
import { GenericFormModel } from '@shared/generic-form-model';


export class CancellationFeesModel implements GenericFormModel {
    id : number;
    hasGracePeriod: string = Utilities.falseString;
    gracePeriod: number;

    constructor() {
        this.id = null;
        this.hasGracePeriod = Utilities.falseString;
        this.gracePeriod = Utilities.zero;
    }

    setData() {}
}