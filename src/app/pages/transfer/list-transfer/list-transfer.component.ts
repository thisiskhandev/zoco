import { Component, OnInit, ViewChild } from '@angular/core';
import { ListTransferEnum } from './shared/list-transfer-enum';
import { ListTransferModel } from './shared/list-transfer-model';
import { CategoryList } from '../../base-list/category-list/category-list';

import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';
import { ListTransferService } from './shared/list-transfer.service';
import { CookieService } from 'ngx-cookie-service';
import { Utilities } from '@shared/utilities';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-transfer',
  templateUrl: './list-transfer.component.html',
  styleUrls: ['./list-transfer.component.css']
})
export class ListTransferComponent extends CategoryList implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  dialogRef: MatDialogRef <ConfirmDialogComponent>;
  listTransfers: Array<ListTransferModel>;
  ListTransferEnum: typeof ListTransferEnum = ListTransferEnum;
  displayedColumns = [
    ListTransferEnum.company_col, ListTransferEnum.address_col,
    ListTransferEnum.city_col, ListTransferEnum.state_col,
    ListTransferEnum.contact_col, ListTransferEnum.total_col,
    ListTransferEnum.action_col
  ];
  selectedTransferId: number;
  
  constructor(private listTransferService: ListTransferService, private cookieService: CookieService,
    public dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.listTransfers = [];
    this.dataSource = new MatTableDataSource <ListTransferModel> (this.listTransfers);
    this.getListTransfers();
  }

  getListTransfers(): void {
    this.listTransferService.getTransferList().subscribe((data:any) => {
        data.data.forEach(transfer => {
          const transferModel = new ListTransferModel(transfer);
          this.listTransfers.push(transferModel);
          this.dataSource.sort = this.sort;
        });
        Utilities.log('listado en modelo: ',this.listTransfers);
    });
  }

  edit(id: number) {
    this.selectedTransferId = Number(id);
    this.cookieService.set(ListTransferEnum.selectedTransferIdCookieName, String(this.selectedTransferId));
  }

  delete(id: number, name: string) {
    this.dialogRef = this.dialog.open( ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = ListTransferEnum.deleteMessage + name
    + ListTransferEnum.questionMark;

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // TODO: Invocar servicio del API para eliminar transfer seleccionado
      }
      this.dialogRef = null;
    });
  }
}
