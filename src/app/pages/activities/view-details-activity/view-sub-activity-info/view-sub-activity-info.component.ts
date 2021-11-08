import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ViewSubActivityInfoModel, SubActivityRatesModel } from './shared/view-sub-activity-info-model';
import { ViewSubActivityInfoEnum } from './shared/view-sub-activity-info-enum';
import { CategoryList } from '../../../base-list/category-list/category-list';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Utilities } from '@shared/utilities';

@Component({
  selector: 'app-view-sub-activity-info',
  templateUrl: './view-sub-activity-info.component.html',
  styleUrls: ['./view-sub-activity-info.component.css']
})
export class ViewSubActivityInfoComponent extends CategoryList implements OnInit {

  @Input() model : Array<ViewSubActivityInfoModel>;
  @ViewChild(MatSort) sort: MatSort;
  selectedRowIndex: number = ViewSubActivityInfoEnum.negativeValue;
  viewSubActivityInfoEnum = ViewSubActivityInfoEnum;
  subActivitydetails : string = '';
  ratesList : Array<SubActivityRatesModel>;

  displayedColumns = [ ViewSubActivityInfoEnum.id, ViewSubActivityInfoEnum.name, ViewSubActivityInfoEnum.date, 
    ViewSubActivityInfoEnum.startTime, ViewSubActivityInfoEnum.endTime ];
  
  constructor() { 
    super();
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource <ViewSubActivityInfoModel> (this.model);
    this.dataSource.sort = this.sort;
  }

  delete(){}

  highlight(row : ViewSubActivityInfoModel){
    this.ratesList = [];
    this.selectedRowIndex = row.id;

    this.subActivitydetails = row.details;
    this.ratesList = row.rates; 

  }

}
