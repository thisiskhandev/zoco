import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core'
import { FormBuilder, NgForm } from '@angular/forms';
import { SettingsTransferEnum, SettingsTransferData} from './shared/setting-transfer.enum';
import { SettingsTransferModel, SettingsTransferItemModel } from './shared/setting-transfer.model';
import { GenericModel } from '@shared/generic-model';
//import { ToastyService } from 'ng2-toasty';
import { AbstractGenericParentComponent } from '@shared/abstract-generic-parent.component';
import { ListSettingComponent } from './list-setting/list-setting.component';
import { SettingTransferService } from './shared/setting-transfer.service';
import { Utilities } from '@shared/utilities';


@Component({
  selector: 'app-setting-transfer',
  templateUrl: './setting-transfer.component.html',
  styleUrls: ['./setting-transfer.component.css'],
  providers: [ SettingTransferService ]
})
export class SettingTransferComponent extends AbstractGenericParentComponent implements  OnInit {
  
  @Input() transferId: number;
  @Input() vehiclesOptions: Array<GenericModel>;
  @Input() driverOptions: Array<GenericModel>;
  @ViewChild (ListSettingComponent) listSettingsComponent: ListSettingComponent;
  itemModel: SettingsTransferItemModel;
  settingsTransferEnum = SettingsTransferEnum;  
  dimentions = [];
  validate = true;  
  daysOption: Array<GenericModel>;
  hoursOption: Array<GenericModel>;
  
  constructor(private formBuilder: FormBuilder,  
    //public toastr: ToastyService, 
    private settingTransferService: SettingTransferService) {
    super();
    this.model = new SettingsTransferModel();
    this.itemModel = new SettingsTransferItemModel();
    this.initForm();
   }

  initForm(): void {
    this.initEmptyForm(this.formBuilder);
  }

  ngOnInit() {
    this.daysOption = SettingsTransferData.daysArray;
    this.hoursOption = SettingsTransferData.hoursArray;

    for (let i = Number(SettingsTransferEnum.one); i <= this.settingsTransferEnum.max; i++)
      this.dimentions.push(i);
  }

  onSubmit() {
    this.model.transferId = this.transferId;
    return this.settingTransferService.save(this.model);   
  }

  daySchedule(event) {
    this.itemModel.day = event.checked ? SettingsTransferEnum.one : SettingsTransferEnum.zero;
  }

  nightSchedule(event) {
    this.itemModel.night = event.checked ? SettingsTransferEnum.one : SettingsTransferEnum.zero;
  }

  addSettings() {
    if(this.validateInformation()) {
      this.getDescription();
      this.model.settingsList.push(this.itemModel);
      this.listSettingsComponent.refresh();
      this.initItemModel();
    }
    else
      this.showErrorMessage();    
  }

  validateInformation() {
    return this.itemModel.vehicleFeatureId != null && this.itemModel.vehiclePlate != null &&
           this.itemModel.vehicleType != null && this.itemModel.stopsOrPickups != null &&
           this.itemModel.availableHours != null && this.itemModel.availableDays  != null &&
           this.itemModel.bagLength != null && this.itemModel.bagHeight != null &&
           this.itemModel.bagWidth != null && this.itemModel.bagWeight != null &&
           (this.itemModel.day != SettingsTransferEnum.zero || this.itemModel.night != SettingsTransferEnum.zero ) &&
           this.itemModel.transferDriverId != null;
  }

  getDescription() {
    let item = this.vehiclesOptions.find(this.findIndex, this.itemModel.vehicleFeatureId);
    this.itemModel.vehicleDescription = item.name;

    let obj = this.driverOptions.find(this.findIndex, this.itemModel.transferDriverId);
    this.itemModel.driverName = obj.name;
  }

  findIndex(data) { 
    return data.id == this;
  }
  
  initItemModel () {
    this.itemModel = new SettingsTransferItemModel();
  }

  showErrorMessage() {
    //this.toastr.error(SettingsTransferEnum.incompleteInfoMesssage);
  }
}



