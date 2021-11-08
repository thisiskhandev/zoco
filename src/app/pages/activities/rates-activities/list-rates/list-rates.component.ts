import { Component, OnInit, Input } from '@angular/core';
import { ListRatesEnum } from './shared/list-rates-enum';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { RatesActivitiesModel, RatesActivitiesItemModel } from '../shared/rates-activities-model';
import { ConfirmDialogComponent } from '@commons/confirm-dialog/confirm-dialog.component';
import { ListActivitiesEnum } from '../../list-activities/shared/list-activities-enum';

@Component({
  selector: 'app-list-rates',
  templateUrl: './list-rates.component.html',
  styleUrls: ['./list-rates.component.css']
})
export class ListRatesComponent implements OnInit {

  @Input() model : Array <RatesActivitiesItemModel>
  listRatesEnum = ListRatesEnum;
  displayedColumns = [ListRatesEnum.activityColumn, ListRatesEnum.typeColumn, ListRatesEnum.priceColumn, ListRatesEnum.action];
  dataSource : MatTableDataSource<RatesActivitiesItemModel>;
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

  delete(name : string, type : string, index : number) {
    this.dialogRef = this.dialog.open( ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete the rate '"+ name+ "' for '"+ type +"'?";

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.remove(index);
      }
      this.dialogRef = null;
    });
  }  

  remove(index : number) {   
    this.model.splice(index, ListRatesEnum.valueOne);
    this.refresh();
  }

}
