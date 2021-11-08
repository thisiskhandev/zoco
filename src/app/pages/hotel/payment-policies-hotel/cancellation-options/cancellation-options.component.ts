import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CancellationOptionsEnum } from './shared/cancellation-options.enum';
import { CancellationOptionsModel } from './shared/cancellation-options.model';
import { CancellationOptionsService } from './shared/cancellation-options.service';
import { GenericModel } from '@shared/generic-model';
import { Utilities } from '@shared/utilities';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';

@Component({
  selector: 'app-cancellation-options',
  templateUrl: './cancellation-options.component.html',
  styleUrls: ['./cancellation-options.component.css'],
  providers: [ CancellationOptionsService ]
})
export class CancellationOptionsComponent extends AbstractGenericFormComponent implements OnInit {
 
  @Input() model : CancellationOptionsModel;
  cancellationsDaysDropdownOptions: Array<GenericModel>;
  penalityDropdownOptions: Array<GenericModel>;
  cancellationOptionsEnum = CancellationOptionsEnum;

  constructor(private formBuilder: FormBuilder, private cancellationOptionsService: CancellationOptionsService) { 
    super();
  }

  ngOnInit() {
    this.initForm();
    this.getCancelationDaysDropdownOptions();
    this.getPenalityDropdownOptions();
  }

  private getCancelationDaysDropdownOptions(): void {
    this.cancellationsDaysDropdownOptions = []
    this.cancellationOptionsService.getCancellationDays().subscribe((data:any) => {
      data.data.forEach( ( cancellationDay,index ) => {
        this.cancellationsDaysDropdownOptions.push(cancellationDay as GenericModel);
      });
    });
  }

  private getPenalityDropdownOptions(): void {
    this.penalityDropdownOptions = [];

    let firstPenalityModel = new GenericModel();
    firstPenalityModel.name = CancellationOptionsEnum.firstPenalityName;
    firstPenalityModel.id  = CancellationOptionsEnum.firstPenalityId;

    let fullPenalityModel = new GenericModel();
    fullPenalityModel.name = CancellationOptionsEnum.fullPenalityName;
    fullPenalityModel.id    =CancellationOptionsEnum.fullPenalityId;

    this.penalityDropdownOptions.push(firstPenalityModel);
    this.penalityDropdownOptions.push(fullPenalityModel);
  }

  initForm(): void {
    this.initEmptyForm(this.formBuilder);
  }

  findCancellationDaysNameById(idToFind: number): string {
    const cancellationDayPolicy = this.cancellationsDaysDropdownOptions.find(x => x.id == idToFind);
    return (cancellationDayPolicy !== undefined) ? cancellationDayPolicy.name  :  '';
  }

}
