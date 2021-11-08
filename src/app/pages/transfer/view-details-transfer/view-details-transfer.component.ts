import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewDetailsTransferEnum, DataDummyTransfer } from './shared/view-details-transfer-enum';
import { ViewDetailsTransferModel } from './shared/view-details-transfer-model';
import { Utilities } from '@shared/utilities';
import { ViewDetailsTransferService } from './shared/view-details-transfer-service';

@Component({
  selector: 'app-view-details-transfer',
  templateUrl: './view-details-transfer.component.html',
  styleUrls: ['./view-details-transfer.component.css']
})
export class ViewDetailsTransferComponent implements OnInit {

  viewDetailsTransferEnum = ViewDetailsTransferEnum;
  model : ViewDetailsTransferModel;
  id : string = '';

  constructor(private route: ActivatedRoute, private service : ViewDetailsTransferService) {
    this.model = new ViewDetailsTransferModel();
   }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get(ViewDetailsTransferEnum.id);
    // TODO: Descomentar la siguiente linea cuando el servicio de completeInfo este listo
    //this.getInformationTransfer();
    let data = DataDummyTransfer.createJson();
    this.model.setData(data);
  }

  getInformationTransfer() {
    this.service.getDetails(this.id).subscribe((data:any) => {
      this.model.setData(data.data);
    })
  }

}
