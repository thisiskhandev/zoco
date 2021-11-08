import { Input } from '@angular/core';
import { BaseNavigatorEnum } from '@baseNavigator-shared/base-navigator-enum';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';
import { AbstractGenericParentComponent } from '@shared/abstract-generic-parent.component';

export abstract class CategoryNavigator {

  completeInfo : any;
  arrayGenericFormsTabs: Array<AbstractGenericFormComponent | AbstractGenericParentComponent>;
  abstract hackToAnotherTab(): void; 
  constructor() { }

  abstract fillCompleteInfo(): void;

  abstract continue($event): void;

}
