import { Component, OnInit, ViewContainerRef, Input, SimpleChange } from '@angular/core';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';
import { FormArray, FormBuilder, Validators  } from '@angular/forms';
//import { ToastsManager } from 'ng2-toastr';
import { RoomPriceEnum } from './shared/room-price-enum';
import { BedInfoEnum } from '../bed-info/shared/bed-info-enum';
import { CustomValidator } from '@shared/customValidator';

@Component({
  selector: 'app-room-price-layout-hotel',
  templateUrl: './room-price.component.html',
  styleUrls: ['./room-price.component.css', '../../shared/hotel.css', '../layout.component.css']
})
export class RoomPriceComponent extends AbstractGenericFormComponent implements OnInit {

  roomPriceEnum = RoomPriceEnum;
  guestsOccupancyArray: Array<number>;
  @Input() guestsOccupancy: number;
  @Input() establishmentName: string;

  constructor(private formBuilder: FormBuilder,
    //public toastr: ToastsManager,
    public vcr: ViewContainerRef) {
    super();
    //this.toastr.setRootViewContainerRef(vcr);    
   }

  ngOnInit(): void {
    this.initForm();
  }


  initForm(): void {

    this.guestsOccupancy = 2;
    this.getGuestNumberList();
    this.initFormGroup();
  }

  initFormGroup(): void {
    this.formGroup = this.formBuilder.group( {
      roomPrice:    [this.model,   Validators.compose([Validators.required, CustomValidator.onlyNumberValidator,
                          Validators.maxLength(RoomPriceEnum.roomPriceMaxSize)])],
    });
  }


  onSubmit(): number {
    return this.model;
  }

  getGuestNumberList(): void {
    this.guestsOccupancyArray = [];
    for(let i=0;i<this.guestsOccupancy;i++) {
      this.guestsOccupancyArray.push(i);
    }
  }


  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    let log: string[] = [];
    for (let propName in changes) {
      

      if(BedInfoEnum.guestsOccupancy === propName){
        
        this.getGuestNumberList();
      }
    }
  }

}
