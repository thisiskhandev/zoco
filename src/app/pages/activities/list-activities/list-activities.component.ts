import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';
import { ListActivitiesEnum } from './shared/list-activities-enum';
import { ListActivitiesModel } from './shared/list-activities-model';
import { ListActivitiesService } from './shared/list-activities.service';
import { CategoryList } from '../../base-list/category-list/category-list';
import { Utilities } from '@shared/utilities';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-activities',
  templateUrl: './list-activities.component.html',
  styleUrls: ['./list-activities.component.css']
})
export class ListActivitiesComponent extends CategoryList implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  dialogRef: MatDialogRef <ConfirmDialogComponent>;
  listActivitiesEnum = ListActivitiesEnum;
  displayedColumns = [ ListActivitiesEnum.id, ListActivitiesEnum.name, ListActivitiesEnum.location, ListActivitiesEnum.action ];
  
  listActivities: Array <ListActivitiesModel>;

  constructor(private service : ListActivitiesService, public dialog : MatDialog) { 
    super();
  }

  ngOnInit() {
    this.listActivities = [];
    this.dataSource = new MatTableDataSource <ListActivitiesModel> (this.listActivities);
    this.getListActivities();
  }

  getListActivities() : void {
    this.service.getListActivities().subscribe (data => 
      data.data.forEach(element => {
        const model = new ListActivitiesModel(element);
        this.listActivities.push(model);
        this.dataSource.sort = this.sort;
      })  
    );
  }

  delete(id: number, name: string) {
    this.dialogRef = this.dialog.open( ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = ListActivitiesEnum.messageDelete + name + ListActivitiesEnum.messageEnd;

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        // TODO: Invocar servicio del API para eliminar la actividad seleccionada
      }
      this.dialogRef = null;
    });
  }

}
