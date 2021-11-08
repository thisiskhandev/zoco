import { Component, OnInit, ViewChild, Input, AfterViewInit, OnChanges, SimpleChanges  } from '@angular/core';
import { RoomInfoComponent } from './room-info/room-info.component';
import { BedInfoComponent } from './bed-info/bed-info.component';
import { RoomPriceComponent } from './room-price/room-price.component';
import { Utilities } from '@shared/utilities';
import { RoomInfoModel } from './room-info/shared/room-info-model';
import { BedInfoModel } from './bed-info/shared/bed-info-model';
import { BedTypeModel } from './bed-info/shared/bed-type-model';
import { SpacesInfoModel } from './bed-info/shared/spaces-info-model';
import { LayoutModel } from './shared/layout-model';
import { LayoutEnum } from './shared/layout-enum';
import { LayoutService } from './shared/layout.service';
import { RoomItemsComponent } from './room-items/room-items.component';
import { FormBuilder } from '@angular/forms';
import { RoomItemsModel } from './room-items/shared/room-items-model';
import { AbstractGenericParentComponent } from '@shared/abstract-generic-parent.component'; 
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonLoadingModalComponent } from '@commons/common-loading-modal/common-loading-modal.component';
import { CommonLoadingModalEnum } from '@commons/common-loading-modal/shared/common-loading-modal.enum';
import { AbstractGenericFormEnum } from "@shared/abstract-generic-form-enum";
import { NavigatorEnum } from '@hotel/shared/navigator-enum';
import { LayoutListComponent } from './layout-list/layout-list.component';

@Component({
  selector: 'app-layout-hotel',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css', './../shared/hotel.css'],
  providers: [ LayoutService ]
})
export class LayoutComponent extends AbstractGenericParentComponent implements OnInit, AfterViewInit  {

  @ViewChild (RoomInfoComponent)  roomInfoComponent;
  @ViewChild (BedInfoComponent)   bedInfoComponent;
  @ViewChild (RoomPriceComponent) roomPriceComponent;
  @ViewChild (RoomItemsComponent) roomItemsComponent;
  actualQuantity: number;
  totalRegisteredRooms: number;
  layoutEnum = LayoutEnum;
  guestsOccupancy: number;
  roomTypeId: any;
  @Input() establishmentName: string;
  @Input() establishmentId: number;
  @Input() establishmentTotalRooms: number;
  layoutList: Array<LayoutModel>;
  showForm: boolean;
  modalRef: MatDialogRef <CommonLoadingModalComponent>;
  constructor(private formBuilder: FormBuilder, private layoutService: LayoutService,
    public dialog: MatDialog ) {
    super();
   }

  ngOnInit() {
    this.model = new LayoutModel();
    this.layoutList = new Array<LayoutModel>();
    this.formGroup = this.formBuilder.group( {
    });
    this.viewErrorMessage = LayoutEnum.viewErrorMessage;
    this.showForm = true;
    this.totalRegisteredRooms = 0;
    this.viewChildComponentsStatus = new Array< boolean>(); //TODO isilva validar status de componentes hijos
    this.viewChildComponentsStatus.push(true);
  }

  isReadyToContinue(): boolean {
    let totalRegisteredRooms = this.countRooms();
    let isFormValid = true;
    if(this.showForm) {      
      isFormValid = this.formGroup.valid;
      let roomInfoModel: RoomInfoModel = this.roomInfoComponent.onSubmit();
      if(isFormValid && !this.model.id) {
        totalRegisteredRooms += roomInfoModel.quantity;       
      }else if(isFormValid && this.model.id) {
        totalRegisteredRooms -=  this.actualQuantity;
        totalRegisteredRooms += roomInfoModel.quantity;  
      }
    }
    let roomRemanent = this.establishmentTotalRooms-totalRegisteredRooms;
    this.viewErrorMessage = LayoutEnum.layoutMessage1+totalRegisteredRooms+LayoutEnum.layoutMessage2+this.establishmentTotalRooms
    +LayoutEnum.layoutMessage3+roomRemanent+LayoutEnum.layoutMessage4;
    this.viewErrorMessage = (isFormValid) ? this.viewErrorMessage : NavigatorEnum.incompleteFormErrorMessage; 
    return totalRegisteredRooms >= this.establishmentTotalRooms && isFormValid;
  }
  
  ngAfterViewInit() {
    this.initForm();
    setTimeout(() => this.totalRegisteredRooms = this.countRooms(), this.utilities.one);
    this.countRooms();
  }

  showLayoutList(): void {
    this.showForm = false;

  }

  countRooms(): number {
    let totalRegisteredRooms = this.utilities.emptyLength;
    this.layoutList.forEach(layout => {
      totalRegisteredRooms += Number(layout.roomInfo.quantity);
    });
    return totalRegisteredRooms;
  }
  
  initForm(): void {

    this.formGroup = this.formBuilder.group( {
    });

    this.formGroup.addControl(LayoutEnum.bedInfo , this.bedInfoComponent.formGroup);
    this.bedInfoComponent.formGroup.setParent(this.formGroup);

    this.formGroup.addControl(LayoutEnum.roomInfo , this.roomInfoComponent.formGroup);
    this.roomInfoComponent.formGroup.setParent(this.formGroup);

    this.formGroup.addControl(LayoutEnum.roomPrice , this.roomPriceComponent.formGroup);
    this.roomPriceComponent.formGroup.setParent(this.formGroup);

    this.formGroup.addControl(LayoutEnum.roomItems , this.roomItemsComponent.formGroup);
    this.roomItemsComponent.formGroup.setParent(this.formGroup);
  }
  
  transformGroupToModel() {

    let roomInfoModel: RoomInfoModel = this.roomInfoComponent.onSubmit();
    const roomPriceModel: number = this.roomPriceComponent.onSubmit();
    const roomItemsModel: RoomItemsModel = this.roomItemsComponent.onSubmit();
    let bedInfoModel:  BedInfoModel;
    let spacesInfoModel: SpacesInfoModel;

    if (this.roomTypeId !== LayoutEnum.roomTypeIdWithoutBedOptions) {
      bedInfoModel = this.bedInfoComponent.onSubmit();
    } else {
      bedInfoModel = new BedInfoModel();
      bedInfoModel.bedMeasures = [];
      bedInfoModel.bedMeasures.push( new BedTypeModel());
    }

    Utilities.log('roomInfoModel: ',roomInfoModel,  this.roomInfoComponent.formGroup);
    Utilities.log('bedInfoModel: ',bedInfoModel    ,this.bedInfoComponent.formGroup);
    Utilities.log('roomPriceModel: ',roomPriceModel,this.roomPriceComponent.formGroup);
    Utilities.log('roomItemsModel: ',roomItemsModel,this.roomItemsComponent.formGroup);

    this.model.hotelServiceId = this.establishmentId;

    this.model.roomInfo = roomInfoModel;
    this.model.price   = roomPriceModel;
    this.model.totalRoomMeasure  = roomItemsModel.roomTotalMeasure;
    this.model.unitOfMeasurement = roomItemsModel.unitOfMeasurement;
    this.model.unitOfMeasurementName = roomItemsModel.unitOfMeasurementName;

    roomInfoModel.roomPeopleQuantity = bedInfoModel.roomPeopleQuantity;
    this.model.bedInfo = bedInfoModel.bedMeasures;

    Utilities.log('layoutModel: ',this.model);
  }

  async onSubmit() {
    if(this.showForm) {
      this.transformGroupToModel();
      let isCreate: boolean = (!this.model.id);
      let promises = await this.layoutService.saveLayoutInfo(this.model).then(res => { 
        if(res) {
          this.model.id = res.id;
          if(isCreate) {
            this.layoutList.push(this.model);
          } else {
            const indexToUpdate = this.layoutList.findIndex(i=> i.id === this.model.id); 
            this.layoutList[indexToUpdate] = this.model;       
          }
          this.showForm = false;
        }
      });
      return promises;
    } else {
      return Promise.resolve(this.utilities.one);
    }
  }
  
  ngOnChanges(changes: SimpleChanges) {
    for (let name in changes) {
      if(name == AbstractGenericFormEnum.completeInfoVariableName && this.completeInfo) {
        this.fillLayoutList();
        this.showForm = false;
        break;
      }
    }
  }

  private fillLayoutList(): void {

    this.totalRegisteredRooms = this.utilities.emptyLength;

    this.completeInfo.layouts.forEach(layout => {
      let layoutModel = new LayoutModel();
      layoutModel.setDataWithCompleteInfo(this.completeInfo, layout);
      this.totalRegisteredRooms += Number(layoutModel.roomInfo.quantity);
      this.layoutList.push(layoutModel);
    });
  }

  getRemaining(): Number {
    return this.establishmentTotalRooms - this.totalRegisteredRooms; 
  }

  onNotifyGuestsOccupancy(guestsOccupancy: number): void {
    this.guestsOccupancy = guestsOccupancy;
  }

  onNotifyRoomTypeId(roomTypeId: number): void {
    this.roomTypeId = roomTypeId;
  }
  
  onNotifyShowForm(value: boolean) {
    this.showForm = value;
  }

  onNotifyLayout(layout: LayoutModel) {
    this.model = layout;
  }

  onNotifyTotalRegisteredRooms(totalRegisteredRooms: number ): void {
    this.totalRegisteredRooms = totalRegisteredRooms;
  }

  onNotifyActualQuantity(actualQuantity: number): void {
    this.actualQuantity = actualQuantity;
  }

}