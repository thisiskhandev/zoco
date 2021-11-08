import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { DriversTransferEnum, DriversTransferData } from './shared/drivers-transfer.enum';
import { DriversTransferModel, DriversTransferItemModel } from './shared/drivers-transfer.model';
import { GenericModel } from '@shared/generic-model';
import { Utilities } from '@shared/utilities';
import { PhoneComponent } from '@commons/phone/phone.component';
import { LanguageComponent } from '@commons/language/language.component';
import { ListDriversComponent } from './list-drivers/list-drivers.component';
//import { ToastyService } from 'ng2-toasty';
import { MultipleSelectorComponent } from '@commons/multiple-selector/multiple-selector.component';
import { AbstractGenericParentComponent } from '@shared/abstract-generic-parent.component';
import { DriversTransferService } from './shared/drivers-transfer.service';

@Component({
  selector: 'app-drivers-transfer',
  templateUrl: './drivers-transfer.component.html',
  styleUrls: ['./drivers-transfer.component.css']
})
export class DriversTransferComponent extends AbstractGenericParentComponent implements OnInit, AfterViewInit {

  @ViewChild (MultipleSelectorComponent) multipleSelectorComponent;
  @ViewChild (PhoneComponent) phoneComponent;
  @ViewChild (LanguageComponent) languageComponent;
  @ViewChild (ListDriversComponent) listDriversComponent : ListDriversComponent;
  @ViewChild("formGroup") form: NgForm;
  itemModel : DriversTransferItemModel;
  @Input() transferId: number;
  driversTransferEnum = DriversTransferEnum;
  carTypesOptions: Array<GenericModel>;
  hourOptionDropdownOptions: Array<number>;
  requiredField : string = Utilities.trueString;
  carTypesOptionsIDsWithoutAllOption: Array<number>;


  constructor(private formBuilder: FormBuilder, //public toastr:ToastyService, 
            private service: DriversTransferService) {
    super();
    this.model = new DriversTransferModel();
    this.itemModel = new DriversTransferItemModel();
    this.utilities = new Utilities();
    this.initForm();
   }

  ngOnInit() {
    this.getEmptyCarTypesOptions();
    this.getHourOptions();
  }

  ngAfterViewInit(): void {
    this.getCarTypesOptions();
  }

  initForm(): void {
    this.initEmptyForm(this.formBuilder);
  }
  
  onSubmit() {
    this.model.transferId = this.transferId;
    return this.service.save(this.model); 
  }

  private setAllItemsIfAllIsSelected(): void {
    const vehicleWithAll = this.itemModel.vehiclesTypes.find(x => x === DriversTransferEnum.allVehicleCategoriesId);
    this.itemModel.vehiclesTypes = (vehicleWithAll) ? this.carTypesOptionsIDsWithoutAllOption : this.itemModel.vehiclesTypes;
  }


  getHourOptions(): void {
    this.hourOptionDropdownOptions = [];
    for (let index = this.utilities.emptyLength; index < DriversTransferEnum.maxHourToPick; index++) {
      this.hourOptionDropdownOptions.push(index);
    }
  }

  getEmptyCarTypesOptions(): void {
    this.carTypesOptions = new Array<GenericModel>();
    this.carTypesOptions.push(DriversTransferData.vehicleCategoriesAll);
  }


  getCarTypesOptions(): void {    
    this.carTypesOptions = new Array<GenericModel>();
    this.carTypesOptionsIDsWithoutAllOption = new Array<number>();
    this.service.getCarCategories().subscribe((data:any) => {
      data.data.forEach(carCategory => {
        const carCategoryModel = carCategory as GenericModel;
        this.carTypesOptions.push(carCategoryModel);
        this.carTypesOptionsIDsWithoutAllOption.push(carCategory.id);
      });
      this.carTypesOptions.push(DriversTransferData.vehicleCategoriesAll);
    });
  }

  addDriver() {
    if(this.validateInformation()) {
      this.setAllItemsIfAllIsSelected();
      this.model.driversList.push(this.itemModel);
      this.updateChildComponents();
    }
    else {
      this.showErrorMessage();
    }    
  }

  private updateChildComponents(): void {
    this.listDriversComponent.refresh();
    this.initItemModel();
    this.phoneComponent.cleanPhones();
    this.form.reset();
  }

  initItemModel () {
    this.itemModel = new DriversTransferItemModel();
    this.multipleSelectorComponent.setModel(this.itemModel.vehiclesTypes);
    this.phoneComponent.setModel(this.itemModel.contactPhone);
    this.languageComponent.setModel(this.itemModel.languages);
  }

  validateInformation(): boolean {
    this.itemModel.contactPhone = this.phoneComponent.onSubmit();
    let isAnyListEmpty: boolean = this.itemModel.contactPhone.length > DriversTransferEnum.valueZero && this.itemModel.vehiclesTypes.length>DriversTransferEnum.valueZero;
    let isFieldsEmpty: boolean = this.itemModel.driverName!='' && this.itemModel.driverLicenceId!='';

    return  isFieldsEmpty && this.itemModel.birthday!=null &&  isAnyListEmpty;
  }

  showErrorMessage() {
    //this.toastr.error(DriversTransferEnum.incompleteInfoMesssage);
  }
  
}
