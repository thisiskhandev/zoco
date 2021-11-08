import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ItineraryEnum } from './shared/itinerary-enum';
import { ItineraryModel, SubActivityModel } from './shared/itinerary-model';
import { ListSubActivitiesComponent } from './list-sub-activities/list-sub-activities.component';
import { Utilities } from '@shared/utilities';
//import { ToastyService } from 'ng2-toasty';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.css']
})
export class ItineraryComponent extends AbstractGenericFormComponent implements OnInit {

  @ViewChild(ListSubActivitiesComponent) listSubActivities: ListSubActivitiesComponent;
  @Input() model : ItineraryModel;
  itemModel : SubActivityModel;
  itineraryEnum = ItineraryEnum;

  constructor(private formBuilder: FormBuilder, 
    //public toastr:ToastyService
    ) {
    super();
    this.itemModel = new SubActivityModel();
   }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.initEmptyForm(this.formBuilder);
  }

  addActivity() {
    if( this.validateInformation() ) {
      this.model.subActivitiesList.push(this.itemModel);
      this.listSubActivities.refresh();
      this.initListModel();
    }
    else {
      this.showErrorMessage();
    } 
  }

  initListModel(){
    this.itemModel = new SubActivityModel();
  }

  validateInformation() {
    return this.itemModel.subActivityName!='' && this.itemModel.startTime!='' 
      && this.itemModel.endTime!='';
  }

  showErrorMessage() {
    //this.toastr.error(ItineraryEnum.incompleteInfoMesssage);
  }

}