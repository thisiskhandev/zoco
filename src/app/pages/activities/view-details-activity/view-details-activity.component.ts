import { Component, OnInit } from '@angular/core';
import { ViewDetailsActivityEnum, DataDummyActivities } from './shared/view-details-activity-enum';
import { ViewDetailsActivityService } from './shared/view-details-activity.service';
import { ActivatedRoute } from '@angular/router';
import { Utilities } from '@shared/utilities';
import { ViewDetaisActivityModel } from './shared/view-details-activity-model';

@Component({
  selector: 'app-view-details-activity',
  templateUrl: './view-details-activity.component.html',
  styleUrls: ['./view-details-activity.component.css']
})
export class ViewDetailsActivityComponent implements OnInit {

  viewDetailsActivityEnum = ViewDetailsActivityEnum;
  model : ViewDetaisActivityModel;
  id : string = '';

  constructor(private route: ActivatedRoute, private service : ViewDetailsActivityService) { 
    this.model = new ViewDetaisActivityModel();
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get(ViewDetailsActivityEnum.id);
    // TODO: Descomentar la siguiente linea cuando el servicio de completeInfo este listo
    //this.getInformationActivity();
    // TODO: Eliminar estas 2 lineas cuando el servicio de completeInfo este listo
    let data = DataDummyActivities.createJson();
    this.model.setData(data);
  }

  getInformationActivity() {
    this.service.getDetails(this.id).subscribe(data => 
    {
      this.model.setData(data.data);
    })
  }

}
