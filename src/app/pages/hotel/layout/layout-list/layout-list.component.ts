import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LayoutListEnum } from './shared/layout-list.enum';
import { LayoutModel } from '../shared/layout-model';
import { CategoryList } from '../../../base-list/category-list/category-list';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { LayoutService } from '../shared/layout.service';
import { ConfirmDialogComponent } from '@commons/confirm-dialog/confirm-dialog.component';
import { Utilities } from '@shared/utilities';
//import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-layout-list',
  templateUrl: './layout-list.component.html',
  styleUrls: ['./layout-list.component.css'],
  providers: [ LayoutService ]
})
export class LayoutListComponent  extends CategoryList implements OnInit{

  @Input() layoutList: Array<LayoutModel>;
  @Input() establishmentTotalRooms: number;
  @Output() notifySelectedLayoutItem: EventEmitter<LayoutModel> = new EventEmitter<LayoutModel>();
  @Output() notifyShowForm: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  @Output() notifyTotalRegisteredRooms: EventEmitter<Number> = new EventEmitter<Number>();
  @Output() notifyActualQuantity: EventEmitter<Number> = new EventEmitter<Number>();
  showForm: boolean;
  totalRegisteredRooms: number;
  private _selectedLayoutItem: LayoutModel;
  dialogRef: MatDialogRef <ConfirmDialogComponent>;
  layoutListEnum = LayoutListEnum;
  displayedColumns = [  LayoutListEnum.roomNameColumn,
     LayoutListEnum.quantityColumn,
      LayoutListEnum.totalRoomMeasureColumn,
    LayoutListEnum.unitMeasureRoomColumn, 
      LayoutListEnum.priceColumn,
      LayoutListEnum.operationsColumn
     ];
  constructor(private layoutService: LayoutService,
    public dialog: MatDialog, 
    //private toastr : ToastyService  
  ) { 
    super();
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource <LayoutModel> (this.layoutList);
    this.countRooms();
    this.showForm = false;
  }

  countRooms(): void {
    this.totalRegisteredRooms = this.utilities.emptyLength;
    this.layoutList.forEach(layout => {
      this.totalRegisteredRooms += Number(layout.roomInfo.quantity);
    });
  }

  getRemainingCount(): number {
    return this.establishmentTotalRooms - this.totalRegisteredRooms;
  }

  delete(id: number, name: string) {
    this.dialogRef = this.dialog.open( ConfirmDialogComponent, {
      disableClose: false
    });
 
    this.dialogRef.componentInstance.confirmMessage = LayoutListEnum.deleteConfirmMessage.replace(LayoutListEnum.tagToReplace, name);

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteLayoutFromArray(id);
      }
      this.dialogRef = null;
    });
    
  }

  onEditLayout(selectedLayout: LayoutModel): void {
    Utilities.log('editando: ',selectedLayout);
    this.onNotifyActualQuantity(selectedLayout.roomInfo.quantity);
    let clonedLayout = Object.assign({}, selectedLayout);
    clonedLayout.roomInfo = Object.assign({}, selectedLayout.roomInfo);  
    this.notifySelectedLayoutItem.emit(clonedLayout);
    this.notifyShowForm.emit(true);
  }

  deleteLayoutFromArray(idLayout: number): void {

    this.layoutService.deleteLayoutInfo(idLayout).subscribe(
        response => {
          if(response) {
            Utilities.log('eliminando layout');
            let indexToDelete = -1;
            this.totalRegisteredRooms = this.utilities.emptyLength;
            this.layoutList.forEach((layout, index) => {
              if(layout.id === idLayout) {
                indexToDelete = index;
              }else {  
                this.totalRegisteredRooms += Number(layout.roomInfo.quantity);
              }
            });
            this.onNotifyTotalRegisteredRooms(this.totalRegisteredRooms);
            if(indexToDelete >= this.utilities.emptyLength)
              this.layoutList.splice(indexToDelete, this.utilities.one);

            this.dataSource = new MatTableDataSource(this.layoutList);    
        }    
      },
        error => {
          //this.toastr.error(LayoutListEnum.deleteLayoutErrorMessage);
      }
  
    );
  }

  public getSelectedLayoutItem(): LayoutModel {
    return this._selectedLayoutItem;
  }
  
  public setSelectedLayoutItem(value: LayoutModel) {
    this._selectedLayoutItem = value;
  }

  public onAddAnotherLayout(): void {
    Utilities.log('creando');
    this.notifySelectedLayoutItem.emit(new LayoutModel());
    this.notifyShowForm.emit(true);
    this.showForm =true;
  }

  onNotifyShowForm(value: boolean): void {
    this.showForm = value;
    this.notifyShowForm.emit(this.showForm);
  }

  onNotifySelectedLayoutItem(value: LayoutModel): void {
    this.notifySelectedLayoutItem.emit(value);
  }
  
  onNotifyTotalRegisteredRooms(total: number): void {
    this.notifyTotalRegisteredRooms.emit(total);
  }

  onNotifyActualQuantity(quantity: number): void {
    this.notifyActualQuantity.emit(quantity);
  }
  getRoomName(value: any): string {
    const customName: string = value[LayoutListEnum.roomJsonNode][LayoutListEnum.customNameJsonNode] ;
    
    return (customName && customName !== '') 
      ?  customName 
      : value[LayoutListEnum.roomJsonNode][LayoutListEnum.roomNameJsonNode]
  }

}