import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NewActivityEnum } from './shared/new-activity-enum';
import { FormBuilder } from '@angular/forms';
import { ActivityInfoComponent } from './activity-info/activity-info.component';
import { FeaturesComponent } from './features/features.component';
import { GeneralDescriptionComponent } from './general-description/general-description.component';
import { ItineraryComponent } from './itinerary/itinerary.component';
import { NewActivityModel } from './shared/new-activity-model';
import { AbstractGenericParentComponent } from '@shared/abstract-generic-parent.component';
import { NewActivityService } from './shared/new-activity.service';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.css']
})
export class NewActivityComponent extends AbstractGenericParentComponent implements OnInit {

  @ViewChild (ActivityInfoComponent) activityInfoComponent;
  @ViewChild (FeaturesComponent) featuresComponent;
  @ViewChild (GeneralDescriptionComponent) generalDescriptionComponent;
  @ViewChild (ItineraryComponent) itineraryComponent;
  @Input() activityId : number;
  newActivityEnum = NewActivityEnum;

  constructor(private formBuilder: FormBuilder, private service : NewActivityService) {
    super();
   }

  ngOnInit() {
    this.model = new NewActivityModel();
    this.formGroup = this.formBuilder.group( {
    });
  }

  ngAfterViewInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group( {
    });
    this.formGroup.addControl(NewActivityEnum.activityInfo, this.activityInfoComponent.formGroup);
    this.activityInfoComponent.formGroup.setParent(this.formGroup);
    this.formGroup.addControl(NewActivityEnum.features, this.featuresComponent.formGroup);
    this.featuresComponent.formGroup.setParent(this.formGroup);
    this.formGroup.addControl(NewActivityEnum.generalDescription, this.generalDescriptionComponent.formGroup);
    this.generalDescriptionComponent.formGroup.setParent(this.formGroup);
    this.formGroup.addControl(NewActivityEnum.itinerary, this.itineraryComponent.formGroup);
    this.itineraryComponent.formGroup.setParent(this.formGroup);
  }

  onSubmit() {
    this.model.activityId = this.activityId;
    // Se invoca el metodo onSubmit de general description para guardar las fotos
    this.generalDescriptionComponent.onSubmit();
    return this.service.save(this.model);
  }

}
