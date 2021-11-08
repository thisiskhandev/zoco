import { Component, OnInit, Input, ViewChild, SimpleChanges } from '@angular/core';
import { ViewDetailsServicesModel } from './shared/view-details-services-model';
import { ViewDetailsServicesEnum } from './shared/view-details-services-enum';
import { CookieService } from 'ngx-cookie-service';
import { CategoryList } from '../../../base-list/category-list/category-list';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-view-details-services',
  templateUrl: './view-details-services.component.html',
  styleUrls: ['./view-details-services.component.css']
})
export class ViewDetailsServicesComponent extends CategoryList implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @Input() model : Array<ViewDetailsServicesModel>;
  @Input() vehicleName : string;
  @Input() transferId : number;
  viewDetailsServicesEnum = ViewDetailsServicesEnum;
  selectedTransferId : number;
  selectedRow : number = ViewDetailsServicesEnum.negativeValue;
  driversAsigned : string;  
  bagsWeight : string;
  length : number;
  width : number;
  height : number;
  scheduleType : string;
  displayedColumns = [ ViewDetailsServicesEnum.plate, ViewDetailsServicesEnum.children, ViewDetailsServicesEnum.pets, 
    ViewDetailsServicesEnum.door, ViewDetailsServicesEnum.stop, ViewDetailsServicesEnum.availability ];

  constructor(private cookieService: CookieService) { 
    super();
    this.initData();
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource <ViewDetailsServicesModel> (this.model);
    this.dataSource.sort = this.sort;
  }

  delete() {}

  loadSettings(id : number) {
    this.selectedTransferId = Number(id);
    this.cookieService.set(ViewDetailsServicesEnum.selectedTransferIdCookieName, String(this.selectedTransferId));
  }

  loadDrivers(id : number) {
    this.selectedTransferId = Number(id);
    this.cookieService.set(ViewDetailsServicesEnum.selectedTransferIdCookieName, String(this.selectedTransferId));
  }

  refreshTable(){
    this.dataSource = new MatTableDataSource(this.model);
  }

  highlight(row : ViewDetailsServicesModel) {
    this.selectedRow = row.id;
    
    this.driversAsigned = row.driversAsigned;
    this.bagsWeight = row.bagsWeight + ViewDetailsServicesEnum.space + ViewDetailsServicesEnum.kg;
    this.length = row.length;
    this.width = row.width;
    this.height = row.height;
    this.scheduleType = row.scheduleType;
  }

  initData() {
    this.length = this.width = this.height = null;
    this.driversAsigned = this.bagsWeight = this.scheduleType = null;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let name in changes) {
      if(name == ViewDetailsServicesEnum.model && this.model) {
        this.initData();
        this.refreshTable();
        break;
      }
    }
  }

}
