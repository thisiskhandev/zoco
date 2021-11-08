import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CancellationFeesEnum } from './shared/cancellation-fees.enum';
import { CancellationFeesModel } from './shared/cancellation-fees.model';
import { CancellationFeesService } from './shared/cancellation-fees.service';
import { GenericModel } from '@shared/generic-model';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';
import { Utilities } from '@shared/utilities';

@Component({
  selector: 'app-cancellation-fees',
  templateUrl: './cancellation-fees.component.html',
  styleUrls: ['./cancellation-fees.component.css'],
  providers: [ CancellationFeesService ]
})
export class CancellationFeesComponent extends AbstractGenericFormComponent implements OnInit {

  @Input() model : CancellationFeesModel;
  gracePeriodRadioOptions: Array<GenericModel>;
  cancellationFeesEnum = CancellationFeesEnum;
  hasGracePeriodBoolean : Boolean = false;

  constructor(private formBuilder: FormBuilder, 
    private cancellationFeesService: CancellationFeesService) { 
    super();
  }

  ngOnInit() {
    this.getGracePeriodOptions();
    this.initForm();
  }

  initForm(): void {
    this.initEmptyForm(this.formBuilder);
  }

  getGracePeriodOptions(): void {
    this.gracePeriodRadioOptions = [];
    this.cancellationFeesService.getGracePeriodOptions().subscribe((data:any) => {
      data.data.forEach( ( gracePeriodOption,index ) => {
        this.gracePeriodRadioOptions.push(gracePeriodOption as GenericModel);
      });
    });
  }

  hasGracePeriodChangeEvent(): void {
    this.model.hasGracePeriod = this.hasGracePeriodBoolean.toString(); 
    this.model.gracePeriod = (this.hasGracePeriodBoolean) ? Number(this.gracePeriodRadioOptions[Utilities.zero].id) : Utilities.zero;
  }

  getId(value) {
    return parseInt(value);
  }

}
