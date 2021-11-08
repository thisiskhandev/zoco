import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ViewDetailsRatesModel, ListViewDetailsRatesModel } from './shared/view-details-rates-model';
import { CategoryList } from '../../../base-list/category-list/category-list';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ViewDetailsRatesEnum } from './shared/view-details-rates-enum';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-view-details-rates',
  templateUrl: './view-details-rates.component.html',
  styleUrls: ['./view-details-rates.component.css']
})
export class ViewDetailsRatesComponent extends CategoryList implements OnInit {

  @Input() model : ViewDetailsRatesModel;
  @Input() transferId : number;
  @ViewChild(MatSort) sort: MatSort;
  viewDetailsRatesEnum = ViewDetailsRatesEnum;
  selectedTransferId : number;

  displayedColumns = [ ViewDetailsRatesEnum.id, ViewDetailsRatesEnum.vehicle, ViewDetailsRatesEnum.origin, 
    ViewDetailsRatesEnum.destination, ViewDetailsRatesEnum.serviceMode, ViewDetailsRatesEnum.people, 
    ViewDetailsRatesEnum.taxes, ViewDetailsRatesEnum.extraCharges, ViewDetailsRatesEnum.parkingPrice, 
  ViewDetailsRatesEnum.totalPrice ];

  constructor(private cookieService: CookieService) {
    super();
   }

  ngOnInit() {
    this.dataSource = new MatTableDataSource <ListViewDetailsRatesModel> (this.model.listRates);
    this.dataSource.sort = this.sort;
  }

  delete() {}

  loadRates(id : number) {
    this.selectedTransferId = Number(id);
    this.cookieService.set(ViewDetailsRatesEnum.selectedTransferIdCookieName, String(this.selectedTransferId));
  }

}
