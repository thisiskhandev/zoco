import { Component, OnInit, ViewChild, Output, EventEmitter  } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListHotelEnum } from './shared/list-hotel-enum';
import { ListHotelService } from './shared/list-hotel.service';
import { ListHotelModel } from './shared/list-hotel-model';
import { CategoryList } from '../../base-list/category-list/category-list';
import { ConfirmDialogComponent } from '@commons/confirm-dialog/confirm-dialog.component';
import { CookieService } from 'ngx-cookie-service';
//import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-list-hotel',
  templateUrl: './list-hotel.component.html',
  styleUrls: ['./list-hotel.component.scss'],
})
export class ListHotelComponent extends CategoryList implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  dialogRef: MatDialogRef <ConfirmDialogComponent>;
  
  displayedColumns = [ ListHotelEnum.id, ListHotelEnum.establishmentName, ListHotelEnum.location, ListHotelEnum.action ];
  listHotelEnum = ListHotelEnum;
  listHotels: Array <ListHotelModel>;
  selectedEstablishmentId: number;

  @Output() notifyselectedEstablishmentId: EventEmitter<number> = new EventEmitter<number>();

  constructor(private listHotelService: ListHotelService,
    public dialog: MatDialog, private cookieService: CookieService, 
    //private toastr : ToastyService 
    ) {
    super();
  }

  ngOnInit() {
    this.listHotels = [];
    this.dataSource = new MatTableDataSource <ListHotelModel> (this.listHotels);
    this.getListHotels();
  }

  getListHotels() : void {
    this.listHotelService.getListHotels().subscribe(data=>
        data.data.forEach(hotel => {
          const hotelModel = new ListHotelModel(hotel);
          this.listHotels.push(hotelModel);
          this.dataSource.sort = this.sort;
        })
      );
    console.log('Hoteles',this.listHotels);
    this.dataSource = new MatTableDataSource <ListHotelModel> (this.listHotels);
  }

  delete(id: number, name: string) {
    this.dialogRef = this.dialog.open( ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete the property '"+ name+ "'?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteHotel(id);
      }
      this.dialogRef = null;
    });
  }

  edit(id: number) {
    this.selectedEstablishmentId = Number(id); 
    this.cookieService.set('selectedEstablishmentId',String(this.selectedEstablishmentId));
  }

  deleteHotel(id) {
    this.listHotelService.deleteHotel(id).subscribe(
      response => {
        if(response) {
          this.remove(id);
        }
        else
          this.showErrorMessage();
      },
      error => {
        this.showErrorMessage();
      }
    );
  }

  remove(id : number) {
    let element = this.listHotels.find(this.findIndexToUpdate, id);
    let index = this.listHotels.indexOf(element);
    this.listHotels.splice(index, ListHotelEnum.valueOne);
    this.dataSource = new MatTableDataSource(this.listHotels);
  }

  findIndexToUpdate(data) { 
    return data.id === this;
  }

  showErrorMessage () {   
    //this.toastr.error(ListHotelEnum.deleteHotelErrorMessage);
  }

  showSuccessMessage() {
    //this.toastr.success(ListHotelEnum.successMessage);
  }

}