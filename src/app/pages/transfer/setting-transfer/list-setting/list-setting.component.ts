import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { SettingsTransferModel, SettingsTransferItemModel } from '../shared/setting-transfer.model';
import { ConfirmDialogComponent } from '@commons/confirm-dialog/confirm-dialog.component';
import { ListSettingEnum } from './shared/list-setting.enum';


@Component({
  selector: 'app-list-setting',
  templateUrl: './list-setting.component.html',
  styleUrls: ['./list-setting.component.css']
})
export class ListSettingComponent implements OnInit {
 
  @Input() model: Array <SettingsTransferItemModel>;

  listSettingEnum = ListSettingEnum;
  displayedColumns = [ListSettingEnum.vehicleDescription, ListSettingEnum.haveChildren,
   ListSettingEnum.allowPets, ListSettingEnum.doorToDoor, ListSettingEnum.stopsOrPickups,
   ListSettingEnum.driverName, ListSettingEnum.action];
  dataSource: MatTableDataSource<SettingsTransferItemModel>;
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

  refreshTable(element: SettingsTransferItemModel) {
    this.model.push(element);
    this.dataSource = new MatTableDataSource(this.model);
   }

  delete(vehicleName: string, driverName: number, index : number) {
    this.dialogRef = this.dialog.open( ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete the settings '"+ vehicleName + "' with driver '"+ driverName +"'?";

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.remove(index);
      }
      this.dialogRef = null;
    });
  }

  remove(index: number) {
    this.model.splice(index, ListSettingEnum.valueOne);
    this.refresh();
  }

}
