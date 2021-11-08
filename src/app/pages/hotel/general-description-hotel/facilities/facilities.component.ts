import { Component, OnInit, Input } from '@angular/core';
import { FacilitiesService } from './shared/facilities.service';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GenericModel } from '@shared/generic-model';
import { CustomValidator } from '@shared/customValidator';
import { FacilitiesEnum } from './shared/facilities-enum';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';
import { Utilities } from '@shared/utilities';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css', './../../shared/hotel.css']
})
export class FacilitiesComponent extends AbstractGenericFormComponent implements OnInit {

  @Input() model: Array<Number> = [];
  facilitiesTypes: Array <GenericModel>;
  requiredField: string = Utilities.trueString;
  facilitiesEnum = FacilitiesEnum;

  constructor(private formBuilder: FormBuilder,
    private facilitiesService: FacilitiesService) { 
      super();
      this.initForm();
  }

  initForm() {
    this.getFacilities();
    this.initEmptyForm(this.formBuilder);
  }

  getFacilities() : void {
    this.facilitiesTypes = [];    
    this.facilitiesService.getFacilities().subscribe(data=> 
      { data.data.forEach(element => {
        const facility = new GenericModel();
        facility.id = element.id;
        facility.name = element.facility_description;
        this.facilitiesTypes.push(facility);
      })}
    );
  }

  ngOnInit() {
  }

}
