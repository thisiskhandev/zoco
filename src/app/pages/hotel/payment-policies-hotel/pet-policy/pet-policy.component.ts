import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PetPolicyEnum } from './shared/pet-policy.enum';
import { PetPolicyModel } from './shared/pet-policy.model';
import { GenericModel } from '@shared/generic-model';
import { PetPolicyService } from './shared/pet-policy.service';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';

@Component({
  selector: 'app-pet-policy',
  templateUrl: './pet-policy.component.html',
  styleUrls: ['./pet-policy.component.css']
})
export class PetPolicyComponent extends AbstractGenericFormComponent implements OnInit {

  @Input() model : PetPolicyModel;
  petPolicyEnum = PetPolicyEnum;
  petPolicyDropdownOptions = Array<GenericModel>();
  petChargePolicyDropdownOptions = Array<GenericModel>();

  constructor(private formBuilder: FormBuilder, private petPolicyService: PetPolicyService) { 
    super();
  }

  ngOnInit() {
    this.getPetPolicyOptions();
    this.petChargePolicyOptions();
    this.initForm();
  }

  initForm(): void {
    this.initEmptyForm(this.formBuilder);
  }

  getPetPolicyOptions(): void {
    this.petPolicyDropdownOptions = [];
    this.petPolicyService.getPetsAllow().subscribe(data=> {
      data.data.forEach(result => {
        const value = new GenericModel();
        value.id = result.id;
        value.name = result.name;

        this.petPolicyDropdownOptions.push(value);
      })
    });
  }

  petChargePolicyOptions(): void {
    this.petChargePolicyDropdownOptions = [];
    this.petPolicyService.getPetsCharge().subscribe(data=> {
      data.data.forEach(result => {
        const value = new GenericModel();
        value.id = result.id;
        value.name = result.name;
        this.petChargePolicyDropdownOptions.push(value);
      })
    });
  }
  
  clearModel(): void {
    if(this.model.canYouBringPets == PetPolicyEnum.noOptionId)
      this.model.petCharge = null;
  }

  ValidatePets(): boolean {
    return this.model.canYouBringPets == PetPolicyEnum.yesOptionId
      || this.model.canYouBringPets == PetPolicyEnum.resquestOptionId;
  }


}
