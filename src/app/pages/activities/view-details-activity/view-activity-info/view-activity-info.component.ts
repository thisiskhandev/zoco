import { Component, OnInit, Input } from '@angular/core';
import { ViewActivityInfoModel } from './shared/view-activity-info-model';
import { ViewActivityInfoEnum } from './shared/view-activity-info-enum';

@Component({
  selector: 'app-view-activity-info',
  templateUrl: './view-activity-info.component.html',
  styleUrls: ['./view-activity-info.component.css']
})
export class ViewActivityInfoComponent implements OnInit {

  @Input() model : ViewActivityInfoModel;
  viewActivityInfoEnum = ViewActivityInfoEnum;

  constructor() {
  }

  ngOnInit() {
  }

}
