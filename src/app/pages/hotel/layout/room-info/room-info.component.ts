import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';
import { FormArray, FormBuilder, Validators  } from '@angular/forms';
import { RoomInfoModel } from './shared/room-info-model';
import { RoomInfoEnum } from './shared/room-info-enum';
import { RoomInfoService } from './shared/room-info.service';
import { GenericModel } from '@shared/generic-model';
//import { ToastyService, ToastyConfig } from 'ng2-toasty';
import { Utilities } from '@shared/utilities';
import { CustomValidator } from '@shared/customValidator';
import { LayoutEnum } from '@hotel/layout/shared/layout-enum';

@Component({
  selector: 'app-room-info-layout-hotel',
  templateUrl: './room-info.component.html',
  styleUrls: ['./room-info.component.css','../../shared/hotel.css', '../layout.component.css'],
  providers: [ RoomInfoService ]
})
export class RoomInfoComponent extends AbstractGenericFormComponent implements OnInit, AfterViewInit, OnChanges  {

  roomTypeDropdownOptions: Array<GenericModel>;
  roomNameDropdownOptions: Array<GenericModel>;
  roomInfoEnum = RoomInfoEnum;
  registeredRoomQuantity: number;
  roomTypeQuantityOptions: Array<number>;
  @Output() notifyRoomTypeId: EventEmitter<number> = new EventEmitter<number>();
  @Input() establishmentTotalRooms: number;
  @Input() totalRegisteredRooms: number;

  constructor(private formBuilder: FormBuilder,
     private roomInfoService: RoomInfoService,    
     //private toastr:ToastyService, 
    // private toastyConfig: ToastyConfig
    ) {
    super();
    //this.roomInfoService.toastr = //this.toastr;
    this.registeredRoomQuantity = this.utilities.emptyLength;
   }

  ngOnInit() {
    
    this.initForm();
  }


  ngAfterViewInit() {
    this.getRoomTypeQuantityDropdownOptions();
  }

  getRoomTypeQuantityDropdownOptions():  Array<number> {
    this.roomTypeQuantityOptions = [];
    for(let i=1;i <= this.establishmentTotalRooms && i<=RoomInfoEnum.roomTypeQuantityMaxOptions;i++) {
      this.roomTypeQuantityOptions.push(i);
    }
    return this.roomTypeQuantityOptions;
  }

  initForm() {
    this.getRoomTypeDropdownOptions();
    this.getRoomNamesDropdownOptions();
    this.initFormGroup();
  }

  initFormGroup(): void {
    this.formGroup = this.formBuilder.group( {
      roomTypeId:                 [(this.model) ? this.model.roomTypeId : this.utilities.emptyLength, Validators.compose([Validators.required, CustomValidator.onlyNumberValidator])],
      quantity:                   [(this.model) ? String(this.model.quantity) : String(this.utilities.emptyLength),   Validators.compose([
                                      Validators.required, 
                                      CustomValidator.onlyNumberValidator,
                                      Validators.maxLength(RoomInfoEnum.quantityMaxSize),
                                      Validators.max(this.getRemaining()+this.utilities.one)])],
      customName:                   [(this.model) ? this.model.customName : '' ],    
      hasSmokingPolicy:           [ (this.model) ? String(this.model.hasSmokingPolicy) : Utilities.falseString ,  Validators.compose([Validators.required])],                                         
      smokingPolicyDescription:   [(this.model) ? this.model.smokingPolicyDescription : this.utilities.emptyLength,  Validators.compose([Validators.maxLength(RoomInfoEnum.roomNameMaxSize)])],  
      roomNameId:                   [(this.model) ? this.model.roomNameId : this.utilities.emptyLength,   Validators.compose([Validators.required, CustomValidator.onlyNumberValidator])],    
    });
  }


  getRoomTypeDropdownOptions() {

    this.roomTypeDropdownOptions = []
    let selectedRoomType: GenericModel;
    this.roomInfoService.getRoomTypes().subscribe((data:any) => {
      data.data.forEach( ( roomType,index ) => {
        let roomTypeModel = roomType as GenericModel;
        roomTypeModel.desc = roomType.room_type_description;
        this.roomTypeDropdownOptions.push(roomTypeModel);
      });
    });

  }


  getRoomNamesDropdownOptions() {
 

    this.roomNameDropdownOptions = []
    let selectedRoomType: GenericModel;
    this.roomInfoService.getRoomName().subscribe((data:any) => {
      data.data.forEach( roomName => {
        let roomNameModel = roomName as GenericModel;
        this.roomNameDropdownOptions.push(roomNameModel);
      });
    });

  }

  isTheFirstItem(index: number) {
    return index == this.utilities.emptyLength ? true : false;
  }
  onSubmit(): RoomInfoModel {
    this.fillRoomName();
    return this.model;
  }

  fillRoomName(): void {
    this.model.roomName = this.roomNameDropdownOptions.find(x => x.id == Number(this.model.roomNameId)).name;
  }


  onChangeRoomTypeIdEvent(val: any) {
    this.notifyRoomTypeId.emit(val);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let name in changes) {
      if(name == LayoutEnum.model) {
        if(this.model) {
          this.model.hasSmokingPolicy = String(this.model.hasSmokingPolicy);
          this.registeredRoomQuantity = Number(this.model.quantity);
          break;
        }
        this.initFormGroup();
      }
    }
  }

  getRemaining(): number {
    return this.establishmentTotalRooms - (this.totalRegisteredRooms - this.registeredRoomQuantity); 
  }

}
