import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';
import { VehicleListEnum } from './shared/vehicle-list.enum';
import { VehicleInfoModel } from '../vehicle-info/shared/vehicle-info.model';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';


import { ConfirmDialogComponent } from '@commons/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent extends AbstractGenericFormComponent implements OnInit {

  vehicleList: MatTableDataSource<VehicleInfoModel>;
  displayedColumns: Array<string>;
  vehicleListEnum = VehicleListEnum;
  dialogRef: MatDialogRef <ConfirmDialogComponent>;
  featuresList : Array <VehicleInfoModel>;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) { 
    super();
    this.vehicleList = new MatTableDataSource();
    this.featuresList = [];
  }

  ngOnInit() {
    this.initForm();
    this.displayedColumns = VehicleListEnum.columnNames;
  }

  initForm(): void { 
    this.formGroup = this.formBuilder.group( { } );
  }

  transformGroupToModel() {}

  onSubmit() {
    return this.featuresList;
  }

  refreshTable(feature : VehicleInfoModel) {
    this.featuresList.push(feature);
    this.vehicleList = new MatTableDataSource(this.featuresList);
  }

  delete( index : number, name : string, model : string ) {
    this.dialogRef = this.dialog.open( ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete the '"+ name + "' model '"+ model+"'?";

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.remove(index);
      }
      this.dialogRef = null;
    });
  }

  remove(index : number) {   
    this.featuresList.splice(index, VehicleListEnum.valueOne);
    this.vehicleList = new MatTableDataSource(this.featuresList);
  }

}
