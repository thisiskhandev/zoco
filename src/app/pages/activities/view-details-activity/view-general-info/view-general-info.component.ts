import { Component, OnInit, Input } from '@angular/core';
import { ViewGeneralInfoModel } from './shared/view-general-info-model';
import { ViewGeneralInfoEnum } from './shared/view-general-info-enum';

@Component({
  selector: 'app-view-general-info',
  templateUrl: './view-general-info.component.html',
  styleUrls: ['./view-general-info.component.css']
})
export class ViewGeneralInfoComponent implements OnInit {

  @Input() model : ViewGeneralInfoModel;
  viewGeneralInfoEnum = ViewGeneralInfoEnum;
    
  constructor() { }

  ngOnInit() {
  }

}
