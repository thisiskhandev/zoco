import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';
import { FormArray, FormBuilder, FormGroup,  Validators  } from '@angular/forms';
import { BedInfoService } from './shared/bed-info.service';
import { BedInfoModel } from './shared/bed-info-model';
import { BedTypeModel } from './shared/bed-type-model';
import { GenericModel } from '@shared/generic-model';
import { BedInfoEnum } from './shared/bed-info-enum';
//import { ToastyService, ToastyConfig } from 'ng2-toasty';
import { SpacesInfoModel } from './shared/spaces-info-model';
import { LayoutEnum } from '@hotel/layout/shared/layout-enum';
import { Utilities } from '@shared/utilities';

@Component({
  selector: 'app-bed-info-layout-hotel',
  templateUrl: './bed-info.component.html',
  styleUrls: ['./bed-info.component.css','../../shared/hotel.css', '../layout.component.css'],
  providers: [ BedInfoService ]
})
export class BedInfoComponent extends AbstractGenericFormComponent implements OnInit, OnChanges {

  bedMeasureDropdownOptions: Array<GenericModel>;
  quatityBedTypesInARoomDropdownOptions: Array<number>;
  bedInfoEnum = BedInfoEnum;
  spacesInfoModel: SpacesInfoModel;
  guestsOccupancyArray: Array<number>;
  @Output() notifyGuestsOccupancy: EventEmitter<number> = new EventEmitter<number>();

  constructor(private formBuilder: FormBuilder,
    private bedInfoService: BedInfoService,    
    //private toastr:ToastyService, 
    //private toastyConfig: ToastyConfig
  ) {
   super();
   //this.bedInfoService.toastr = //this.toastr;
  }

  ngOnInit() {
    this.getBedTypeDropdownOptions();
    this.fillQuatityBedTypesInARoomDropdownOptions();
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group( {
      roomPeopleQuantity: [this.model.roomPeopleQuantity],
      bedMeasures: this.formBuilder.array([]),
    });//TODO isilva el formgroup no toma bien los valores desde la vista, 
          //   por ende se comenta los validadores de formgroup, a fin que no impida el submit
    
    this.formGroup.get(BedInfoEnum.roomPeopleQuantity).valueChanges.subscribe(val => { 
      setTimeout(() => { this.onChangeGuestsOccupancyEvent(val); }, this.utilities.one );
      this.getGuestNumberList(); 
    } );
    this.fillBedTypes();
    this.getGuestNumberList();
  }

  private fillBedTypes(): void {
    if(this.model.bedMeasures && this.model.bedMeasures.length > this.utilities.emptyLength ) {
      this.model.bedMeasures.forEach(bed => {
        this.addBedType(null, bed);  
      });
    } else {
      this.addBedType(null,this.getEmptyBedTypeModel());
    }
  }

  getBedMeasure(index: number): BedTypeModel {
    return this.model.bedMeasures[index];
  }

  getEmptyBedTypeModel(): BedTypeModel {
    let emptyBed = new BedTypeModel();
    emptyBed.id = null;
    emptyBed.itemQuantity = this.utilities.emptyLength;
    this.model.bedMeasures.push(emptyBed);
    return emptyBed;
  }

  addBedType($event, bed?: BedTypeModel): void {
    if (event && !bed) {
      event.stopPropagation();
      bed = this.getEmptyBedTypeModel()
    }
    const bedMeasures = this.formGroup.get(BedInfoEnum.bedMeasures) as FormArray;
    if (bedMeasures.length < BedInfoEnum.bedMeasuresMaxItems) {
      bedMeasures.push(this.formBuilder.group({
        measureItem: [(bed) ? bed.id : null],
        bedQuantity: [(bed) ? String(bed.itemQuantity) : String(this.utilities.emptyLength)]
      }));
    }
  }

  canAddMoreBedTypes(): boolean {
    const bedMeasures = this.formGroup.get(BedInfoEnum.bedMeasures) as FormArray;
    return bedMeasures.length < BedInfoEnum.bedMeasuresMaxItems;
  }


  private getBedTypeDropdownOptions(): void {

    this.bedMeasureDropdownOptions = []
    this.bedInfoService.getBedMeasures().subscribe((data:any) => {
      data.data.forEach( ( bedMeasure ) => {
        let bedMeasureModel = bedMeasure as GenericModel;
        bedMeasureModel.desc = bedMeasure.item_name;
        this.bedMeasureDropdownOptions.push(bedMeasureModel);
      });
    });
  }

  private fillQuatityBedTypesInARoomDropdownOptions(): void {
    this.quatityBedTypesInARoomDropdownOptions = [];
    for (let i = 1; i <= BedInfoEnum.maxBedTypeInARoom; i++) {
      this.quatityBedTypesInARoomDropdownOptions.push(i);
    }
  }

  public getQuatityBedTypesInARoomDropdownOptions(): Array<number> {
    return this.quatityBedTypesInARoomDropdownOptions;
  }

  removeBedMeasure(i): void {
    const bedMeasures = this.formGroup.get(BedInfoEnum.bedMeasures) as FormArray;
    const toDelete =  Number(bedMeasures.value[i].bedQuantity);

    const hotelAttribute = this.formGroup.get(BedInfoEnum.roomPeopleQuantity)  as FormArray;
    
    let totalGuest: number = Number(hotelAttribute.value);

    totalGuest-= toDelete;
    

    hotelAttribute.setValue( []);
    hotelAttribute.setValue( [totalGuest]);
    bedMeasures.removeAt(i);
    this.model.bedMeasures.slice(i,i+this.utilities.one);
  }

  getBedMeasures(): FormGroup {
    return this.formGroup.get(BedInfoEnum.bedMeasures) as FormGroup;
  }

  bedQuantityOnChange($event): void {
    var totalItem: number = Number(0);
    let hotelAttribute = this.formGroup.get(BedInfoEnum.bedMeasures)  as FormArray;
    hotelAttribute.value.forEach(bedMeasures => {
      var item = Number(bedMeasures.bedQuantity);
      totalItem += item;
     }); 

    hotelAttribute = this.formGroup.get(BedInfoEnum.roomPeopleQuantity)  as FormArray;
    hotelAttribute.setValue([]);
    hotelAttribute.setValue([totalItem]);
  }


  onSubmit(): BedInfoModel {
    this.transformGroupToModel();
    return this.model;
  }

  transformGroupToModel(): void {
    
    let hotelAttribute = this.formGroup.get(BedInfoEnum.roomPeopleQuantity)  as FormArray;
    this.model.roomPeopleQuantity = Number(hotelAttribute.value);

    this.model.bedMeasures = [];
    hotelAttribute = this.formGroup.get(BedInfoEnum.bedMeasures)  as FormArray;
    hotelAttribute.value.forEach(bedMeasures => {

      let bedTypeModel = new BedTypeModel();
      bedTypeModel.id = bedMeasures.measureItem as number;
      bedTypeModel.itemQuantity = bedMeasures.bedQuantity as number;
      this.model.bedMeasures.push(bedTypeModel);
     }); 
  }
  onChangeGuestsOccupancyEvent(val: any) {
    this.notifyGuestsOccupancy.emit(val);
  }

  getGuestNumberList(): void {
    this.guestsOccupancyArray = [];

    let hotelAttribute = this.formGroup.get(BedInfoEnum.roomPeopleQuantity)  as FormArray;
    let guestsOccupancy = Number(hotelAttribute.value);

    for(let i=0;i<guestsOccupancy;i++) {
      this.guestsOccupancyArray.push(i);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let name in changes) {
      if(name == LayoutEnum.model) {
        let modelAux = new BedInfoModel();
        modelAux.bedMeasures = this.model;
        modelAux.roomPeopleQuantity = this.utilities.emptyLength;
        modelAux.bedMeasures.forEach(bed => {
          modelAux.roomPeopleQuantity += Number(bed.itemQuantity);
        });

        this.model = modelAux;
        setTimeout(() => { this.initForm(); }, this.utilities.one );
        setTimeout(() => { this.onChangeGuestsOccupancyEvent(this.model.roomPeopleQuantity); }, this.utilities.one );
      }
    }
  }


}
