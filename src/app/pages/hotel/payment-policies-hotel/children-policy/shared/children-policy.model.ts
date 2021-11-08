import { ChildrenPolicyEnum } from './children-policy.enum';
import { GenericFormModel } from '@shared/generic-form-model';

export class ChildrenPolicyModel implements GenericFormModel {
    id : number;
    childAllowed: string = ChildrenPolicyEnum.childAllowedDefaultValue;

    constructor() {
        this.id = null;
        this.childAllowed = ChildrenPolicyEnum.childAllowedDefaultValue;
    }

    setData() {}
}