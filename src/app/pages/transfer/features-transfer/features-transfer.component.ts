import { Component, OnInit, Input, ViewChild, AfterViewInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Environment } from 'environments/environment';
import { FeaturesTransferEnum } from './shared/features-transfer.enum';
import { FeaturesTransferModel } from './shared/features-transfer.model';
import { VehicleInfoComponent } from './vehicle-info/vehicle-info.component';
import { PhotoGalleryModel } from '@commons/photo-gallery/shared/photo-gallery-model';
import { PhotoGalleryComponent } from '@commons/photo-gallery/photo-gallery.component';
import { ModalSavePhotosComponent } from '@commons/modal-save-photos/modal-save-photos.component';
import { ModalSavePhotosModel } from '@commons/modal-save-photos/shared/modal-save-photos-model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TransferFeaturesService } from "./shared/features-transfer.service";
import { AbstractGenericParentComponent } from '@shared/abstract-generic-parent.component';
import { BasicInformationTransferEnum } from '../basic-information-transfer/shared/basic-information-transfer.enum';
import { Utilities } from '@shared/utilities';

@Component({
  selector: 'app-features-transfer',
  templateUrl: './features-transfer.component.html',
  styleUrls: ['./features-transfer.component.css'],
  providers: [ TransferFeaturesService ]
})
export class FeaturesTransferComponent extends AbstractGenericParentComponent implements OnInit {


  @Input() transferId: number;
  featuresTransferEnum = FeaturesTransferEnum;
  @ViewChild (VehicleInfoComponent) vehicleInfoComponent;
  @ViewChild (PhotoGalleryComponent) photoGalleryComponent : PhotoGalleryComponent;
  images : PhotoGalleryModel [];  
  modalRef: MatDialogRef <ModalSavePhotosComponent>;
  infoModal: ModalSavePhotosModel;

  
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private featuresTransferService: TransferFeaturesService) { 
    super();
    this.model = new FeaturesTransferModel();
    this.images = [];
  }

  ngOnInit() {
    this.initEmptyForm(this.formBuilder);
  }
  
  ngAfterViewInit() {
    this.initForm();
  }

  initForm(): void {
    this.initEmptyForm(this.formBuilder);

    this.formGroup.addControl(FeaturesTransferEnum.vehicleInfo , this.vehicleInfoComponent.formGroup);
    this.vehicleInfoComponent.formGroup.setParent(this.formGroup);

    this.formGroup.addControl(FeaturesTransferEnum.vehiclePhotos, this.photoGalleryComponent.formGroup);
    this.photoGalleryComponent.formGroup.setParent(this.formGroup);
  }

  transformGroupToModel() {
    this.model.transferServiceId = this.transferId;
    this.model.vehiclesInfo = this.vehicleInfoComponent.onSubmit();
  }

  async asyncSubmit() {
    this.images = this.photoGalleryComponent.onSubmit();
    
    try{
      this.infoModal=new ModalSavePhotosModel();
      if(this.infoModal) {
        this.infoModal.id = this.transferId;
        this.infoModal.images = this.images;
        this.infoModal.apiUrl = Environment.photoTransferApiUrl;

        this.modalRef = this.dialog.open( ModalSavePhotosComponent, {
          disableClose: true,
          height: FeaturesTransferEnum.heightModal.toString(),
          width: FeaturesTransferEnum.widthModal.toString(),   
          data: { 
            infoModal : this.infoModal,
          }
        });
        (await this.modalRef.afterClosed().toPromise());
      }
    }
    catch(e) {
      return e;
    }    
  }


  ngOnChanges(changes: SimpleChanges) {
    for (let name in changes) {
      if(name == BasicInformationTransferEnum.completeInfoVariableName && this.completeInfo) {
        this.model.setData(this.completeInfo.vehiclesFeatures);
        Utilities.log('Features Cargado: ',this.model);
        break;
      }
    }
  }

  onSubmit() {
    this.transformGroupToModel();
    this.asyncSubmit();
    return this.featuresTransferService.save(this.model);
  }

  loadPhotos(): void {
    this.photoGalleryComponent.loadPhotos();
  }
}
