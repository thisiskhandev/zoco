import { Component, OnInit, Input } from '@angular/core';
import { ViewDetailsVehiclesModel } from './shared/view-details-vehicles-model';
import { ViewDetailsVehiclesEnum } from './shared/view-details-vehicles-enum';
import { CookieService } from 'ngx-cookie-service';
import { ViewDetailsServicesModel } from '../view-details-services/shared/view-details-services-model';
import { ViewDetailsServicesComponent } from '../view-details-services/view-details-services.component';

@Component({
  selector: 'app-view-details-vehicles',
  templateUrl: './view-details-vehicles.component.html',
  styleUrls: ['./view-details-vehicles.component.css']
})
export class ViewDetailsVehiclesComponent implements OnInit {

  @Input() model : ViewDetailsVehiclesModel;
  serviceDetails : Array<ViewDetailsServicesModel>;
  viewDetailsVehiclesEnum = ViewDetailsVehiclesEnum;
  selectedTransferId: number;
  vehicleName : string;

  constructor(private cookieService: CookieService) {
    this.serviceDetails = [];
    this.vehicleName = null;
  }

  ngOnInit() {    
  }

  loadFeatures(id : number) {
    this.selectedTransferId = Number(id);
    this.cookieService.set(ViewDetailsVehiclesEnum.selectedTransferIdCookieName, String(this.selectedTransferId));
  }

  initSettingsModel(event) {
    this.serviceDetails = [];
    let element = this.model.listViewDetailsVehiclesModel.find(this.findIndex, event.selectedRowIndex);
    if(element){
      this.vehicleName = element.brand + ViewDetailsVehiclesEnum.space + element.model;
      this.model.listViewDetailsServices.forEach ( item => {
        if(item.vehicleId == element.id) {
          this.serviceDetails.push(item);
        }
      })
    }
  }
  
  findIndex(data) { 
    return data.id === this;
  }

}
