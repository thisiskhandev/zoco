import { Component, OnInit, Input } from '@angular/core';
import { ListSubActivitiesEnum } from './shared/list-sub-activities-enum';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '@commons/confirm-dialog/confirm-dialog.component';
import { SubActivityModel } from '../shared/itinerary-model';

@Component({
  selector: 'app-list-sub-activities',
  templateUrl: './list-sub-activities.component.html',
  styleUrls: ['./list-sub-activities.component.css']
})
export class ListSubActivitiesComponent implements OnInit {

  @Input() model : Array <SubActivityModel>;

  listSubActivitiesEnum = ListSubActivitiesEnum;
  displayedColumns = [ListSubActivitiesEnum.subActivityColumn, ListSubActivitiesEnum.dateColumn, 
    ListSubActivitiesEnum.startTimeColumn, ListSubActivitiesEnum.endTimeColumn, ListSubActivitiesEnum.action];
 
  dataSource : MatTableDataSource<SubActivityModel>;
  dialogRef: MatDialogRef <ConfirmDialogComponent>;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.dataSource = new MatTableDataSource(this.model);
  }

  refreshTable(element : SubActivityModel) {
    this.model.push(element);
    this.dataSource = new MatTableDataSource(this.model);
  }

  delete(name: string) {
    this.dialogRef = this.dialog.open( ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete the sub activity '"+ name+ "'?";

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.remove(name);
      }
      this.dialogRef = null;
    });
  }

  remove(name : string) {
    let element = this.model.find(this.findIndexToUpdate, name);
    let index = this.model.indexOf(element);
    this.model.splice(index, ListSubActivitiesEnum.valueOne);
    this.refresh();
  }

  findIndexToUpdate(data) { 
    return data.subActivityName === this;
  }

}
