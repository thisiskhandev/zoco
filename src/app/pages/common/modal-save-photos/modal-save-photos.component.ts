import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalSavePhotosModel } from './shared/modal-save-photos-model';
import { ModalSavePhotosService } from './shared/modal-save-photos.service';
import { ModalSavePhotosEnum } from './shared/modal-save-photos-enum';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-save-photos',
  templateUrl: './modal-save-photos.component.html',
  styleUrls: ['./modal-save-photos.component.css']
})
export class ModalSavePhotosComponent implements OnInit {

  modalSavePhotosEnum = ModalSavePhotosEnum;
  quantityFiles : number = ModalSavePhotosEnum.valueZero;
  processedFiles: number = ModalSavePhotosEnum.valueZero;
  percentage: number = ModalSavePhotosEnum.valueZero;
  infoModal : ModalSavePhotosModel;
  height: string;

  constructor( @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<ModalSavePhotosComponent>, private service : ModalSavePhotosService,
    config: NgbProgressbarConfig ) { 
    if(this.data) {
      this.infoModal = new ModalSavePhotosModel()
      if(this.infoModal) {
        this.infoModal.id = this.data.infoModal.id;
        this.infoModal.images = this.data.infoModal.images;
        this.infoModal.apiUrl = this.data.infoModal.apiUrl;
        this.saveInfo();
      }
    }
    this.height = ModalSavePhotosEnum.heightProgressBar;

    config.striped = true;
    config.animated = true;
  }

  ngOnInit() {
  }

  async saveInfo() {   
    let promises = [];
    this.quantityFiles = this.infoModal.images.length;
    let successfulCounter = ModalSavePhotosEnum.valueZero;
    let failedCounter = ModalSavePhotosEnum.valueZero;
    let errorMessage = ModalSavePhotosEnum.messageErrorSavePhotos.toString() + ModalSavePhotosEnum.newLine;
    this.processedFiles = this.percentage = ModalSavePhotosEnum.valueZero;
    
    for(let i=0; i<this.quantityFiles; i++) {
      let formData = new FormData();
      let file = this.infoModal.images[i].image;
      formData.append(ModalSavePhotosEnum.imageJson, file, file.name);
      formData.append(ModalSavePhotosEnum.idJson, this.infoModal.id.toString());
      formData.append(ModalSavePhotosEnum.method, this.infoModal.images[i].method);
      
      promises.push( await this.service.savePhotos(formData, this.infoModal.images[i].method, this.infoModal.apiUrl, this.infoModal.images[i].id ));
      
      this.percentage = (++this.processedFiles * ModalSavePhotosEnum.valueHundred) / this.quantityFiles;

      if( promises[i]) {
        successfulCounter = successfulCounter + ModalSavePhotosEnum.valueOne;
      }
      else{
        failedCounter = failedCounter + ModalSavePhotosEnum.valueOne;
        errorMessage = errorMessage.concat( file.name + ModalSavePhotosEnum.newLine );
      }     
    }
    if(failedCounter != ModalSavePhotosEnum.valueZero) {
      this.service.showError(errorMessage);
    }
    else {
      this.service.showMessageSuccessFullSavePhotos();
    }

    this.dialogRef.close(promises);
  }


}
