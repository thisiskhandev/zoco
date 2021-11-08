import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivityInfoModel } from './shared/activity-info-model';
import { ActivityInfoEnum } from './shared/activity-info-enum';
import { Utilities } from '@shared/utilities';
import { GenericModel } from '@shared/generic-model';
import { ActivityInfoService } from './shared/activity-info.service';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-activity-info',
  templateUrl: './activity-info.component.html',
  styleUrls: ['./activity-info.component.css']
})
export class ActivityInfoComponent extends AbstractGenericFormComponent implements OnInit {

  @Input() model : ActivityInfoModel;
  activityInfoEnum = ActivityInfoEnum;
  timeOptions: Array<GenericModel>;
  cityOptions: Array<GenericModel>;
  typeScheduleOptions: Array<GenericModel>;
  highlightTypes: Array<GenericModel>;
  vector: number [];
  requiredField : string = Utilities.falseString;
  destinationCity : any;

  constructor(private formBuilder: FormBuilder, private service: ActivityInfoService) { 
    super();
    this.destinationCity = '';
   }

  ngOnInit() {
    this.fillVector();
    this.initForm();
  }

  fillVector() {
    this.vector = [];
    for (let i=Number(ActivityInfoEnum.valueOne); i<=ActivityInfoEnum.sizeVector; i++)
      this.vector.push(i);
  }

  initForm() {
    this.initEmptyForm(this.formBuilder);
    this.getTimeOption();
    this.getSchedule();
    this.getHighlightTypes();
  }

  getTimeOption(): void {
    this.timeOptions = [];
    this.service.getTimeOption().subscribe(data => 
      {data.forEach(item => {
        const element = new GenericModel();
        element.id = item.id;
        element.name = item.name;
        this.timeOptions.push(element);
        })
      }
    );
  }

  getSchedule(): void {
    this.typeScheduleOptions = [];
    this.service.getSchedule().subscribe(data => 
      {data.forEach(item => {
        const element = new GenericModel();
        element.id = item.id;
        element.name = item.name;
        this.typeScheduleOptions.push(element);
        })
      }
    );
  }

  getHighlightTypes(): void {
    this.highlightTypes = [];
    this.service.getHighlightTypes().subscribe(data => 
      {data.forEach(item => {
        const element = new GenericModel();
        element.id = item.id;
        element.name = item.name;
        this.highlightTypes.push(element);
        })
      }
    );
  }

  
  // Metodos usados en el autocomplete
  myListFormatter(data: any): string {
    return `${data[ActivityInfoEnum.cityName]} (${data[ActivityInfoEnum.cityIataCode]})`;
  }

  myCallback(data: any): string {
    this.model.destination = data[ActivityInfoEnum.cityIataCode];
    return `${data[ActivityInfoEnum.cityName]} (${data[ActivityInfoEnum.cityIataCode]})`;
  }

  observableSource = (keyword: any): Observable <any[]> => {
    return this.service.getCitys(keyword);
  }

}
