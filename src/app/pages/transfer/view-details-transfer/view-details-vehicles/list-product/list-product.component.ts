import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListProductEnum } from './shared/list-product-enum';
import { CategoryList } from '../../../../base-list/category-list/category-list';
import { ListProductModel } from './shared/list-product-model';
import { ViewDetailsServicesModel } from '../../view-details-services/shared/view-details-services-model';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent extends CategoryList implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @Input() model : Array<ListProductModel>;
  @Output() selectedRowIndex = new EventEmitter();
  selectedRow : number = ListProductEnum.negativeValue;
  listProductEnum = ListProductEnum;
  listServicesByVehicle : ViewDetailsServicesModel;

  displayedColumns = [ ListProductEnum.brand, ListProductEnum.model, ListProductEnum.transportType, 
    ListProductEnum.capacity, ListProductEnum.stock ];

  constructor() { 
    super();
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource <ListProductModel> (this.model);
    this.dataSource.sort = this.sort;
  }

  delete() {}

  highlight(row : ListProductModel){
    this.selectedRow = row.id;
    this.selectedRowIndex.emit({selectedRowIndex: row.id});
  }

}
