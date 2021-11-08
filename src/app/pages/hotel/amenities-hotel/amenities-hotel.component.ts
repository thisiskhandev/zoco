import { Component, OnInit, ViewChild, ViewChildren, QueryList, Input, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { AmenitiesEnum, AmenitiesSubsection } from './shared/amenities-enum';
import { AmenitiesService } from './shared/amenities.service';
import { GenericModel } from '@shared/generic-model';
import { FormBuilder } from '@angular/forms';
import { MultipleSelectorComponent } from '@commons/multiple-selector/multiple-selector.component';
import { ExtraBedComponent } from './extra-bed/extra-bed.component';
import { AmenitiesModel } from './shared/amenities-model';
import { MultipleSelectorAccordionComponent } from '@commons/multiple-selector-accordion/multiple-selector-accordion.component';
import { AbstractGenericParentComponent } from '@shared/abstract-generic-parent.component';
import { AmenitiesList } from '@hotel/amenities-hotel/shared/amenitiesList-model';

@Component({
  selector: 'app-amenities-hotel',
  templateUrl: './amenities-hotel.component.html',
  styleUrls: ['./amenities-hotel.component.css']
})
export class AmenitiesHotelComponent extends AbstractGenericParentComponent implements OnInit, AfterViewInit {
  
  @ViewChild (ExtraBedComponent) extraBedComponentChild;
  // @ViewChildren (AmenitiesEnum.multipleSelectorAccordion) components: QueryList <MultipleSelectorAccordionComponent>;
  @ViewChildren ("multipleSelectorAccordion") components: QueryList <MultipleSelectorAccordionComponent>;
  @Input() establishmentId: number;
  @Input() displayAccordion: boolean;

  amenitiesEnum = AmenitiesEnum;
  amenitiesSubsection : AmenitiesSubsection;
  subsectionAmenities;

  constructor(private formBuilder: FormBuilder, private amenitiesService: AmenitiesService, private cdRef:ChangeDetectorRef) {
    super();
    this.subsectionAmenities = AmenitiesSubsection.subsections;
    this.getItemsSubsection();
  }

  ngOnInit() {
    this.model = new AmenitiesModel();
    for(let i=Number(AmenitiesEnum.valueZero); i<this.subsectionAmenities.length; i++) {
      let object = new AmenitiesList();
      this.model.amenitiesList.push(object);
    }

    this.formGroup = this.formBuilder.group ({});
  }

  ngAfterViewInit() {
    this.initForm();
  }

  getItemsSubsection() : void {
    this.cleanVector();
    
    this.amenitiesService.getItemsSubsection().subscribe(data=> 
      { data.data.forEach(itemType => {
        let index = this.subsectionAmenities.findIndex(i=> i.title === itemType.amenitiesTypeDescription);        
        if (index >= AmenitiesEnum.valueZero){
          for(let i =0; i<itemType.amenitiesList.length; i++) {
            const item = new GenericModel();
            item.id = itemType.amenitiesList[i].id;
            item.name = itemType.amenitiesList[i].amenityDescription;
            this.subsectionAmenities[index].amenitiesList.push(item);
          }
        }        
        })
      });
  }

  cleanVector() {
    this.subsectionAmenities.forEach(element => {
      element.amenitiesList =[];
    })
  }

  initForm() {
    this.formGroup.addControl(AmenitiesEnum.extrabeds, this.extraBedComponentChild.formGroup);
    this.extraBedComponentChild.formGroup.setParent(this.formGroup);
  }

  onSubmit() {
    this.model.hotelServiceId = this.establishmentId;
    this.model.hasExtraBed = this.model.extraBeds.hasExtraBed;
    this.model.amenities = [];
    
    for(let i=0; i<this.components.toArray().length; i++) {
      let ids = this.components.toArray()[i].model;
      for(let j=0; j<ids.length; j++)
        this.model.amenities.push(ids[j]);
    }

    return this.amenitiesService.save(this.model);
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();  
    this.components.changes.subscribe((comps: QueryList <MultipleSelectorAccordionComponent>) => 
    {
      for(let i=0; i<comps.toArray().length; i++) {
        this.formGroup.addControl(AmenitiesEnum.multipleSelectorAccordion+i, comps.toArray()[i].formGroup); 
        this.components.toArray()[i].formGroup.setParent(this.formGroup);
      }        
    });
  }

}
