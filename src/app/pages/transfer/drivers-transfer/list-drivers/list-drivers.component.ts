import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ListDriversEnum } from './shared/list-drivers-enum';

import { DriversTransferModel, DriversTransferItemModel } from '../shared/drivers-transfer.model';
import { ConfirmDialogComponent } from '@commons/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-drivers',
  templateUrl: './list-drivers.component.html',
  styleUrls: ['./list-drivers.component.css']
})
export class ListDriversComponent implements OnInit, OnChanges {

  @Input() model : Array <DriversTransferItemModel>;

  listDriversEnum = ListDriversEnum;
  displayedColumns = [ListDriversEnum.driverName, ListDriversEnum.driverLicenceId, ListDriversEnum.contactPhone, ListDriversEnum.birthday, ListDriversEnum.action];
  dataSource: MatTableDataSource<DriversTransferItemModel>;
  dialogRef: MatDialogRef <ConfirmDialogComponent>;

  constructor(public dialog: MatDialog) { 
    this.model = [];
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.dataSource = new MatTableDataSource(this.model);
  }

  refreshTable(element : DriversTransferItemModel) {
    this.model.push(element);
    this.dataSource = new MatTableDataSource(this.model);
   }

  delete(name : string, index : number) {
    this.dialogRef = this.dialog.open( ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete the driver '"+ name+ "'?";

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.remove(index);
      }
      this.dialogRef = null;
    });
  }  

  remove(index : number) {   
    this.model.splice(index, ListDriversEnum.valueOne);
    this.refresh();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let name in changes) {
      if(name == ListDriversEnum.model && this.model && this.model.length > ListDriversEnum.valueZero) {
        this.refresh();
        break;
      }
    }
  }

}
