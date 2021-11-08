import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GeneralDescriptionEnum } from './shared/general-description-enum';
import { GeneralDescriptionModel } from './shared/general-description-model';
import { PhotoGalleryComponent } from '@commons/photo-gallery/photo-gallery.component';
import { ModalSavePhotosModel } from '@commons/modal-save-photos/shared/modal-save-photos-model';
import { PhotoGalleryModel } from '@commons/photo-gallery/shared/photo-gallery-model';
import { ModalSavePhotosComponent } from '@commons/modal-save-photos/modal-save-photos.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Environment } from 'environments/environment';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';

@Component({
  selector: 'app-general-description',
  templateUrl: './general-description.component.html',
  styleUrls: ['./general-description.component.css']
})
export class GeneralDescriptionComponent extends AbstractGenericFormComponent implements OnInit {

  @ViewChild (PhotoGalleryComponent) photoGalleryComponent : PhotoGalleryComponent;
  @Input () activityId : number;
  @Input() model : GeneralDescriptionModel;
  infoModal: ModalSavePhotosModel;
  images : PhotoGalleryModel [];
  modalRef: MatDialogRef <ModalSavePhotosComponent>;
  generalDesEnum = GeneralDescriptionEnum;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) { 
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  ngAfterViewInit() {
    this.formGroup.addControl(GeneralDescriptionEnum.photosActivities, this.photoGalleryComponent.formGroup);
    this.photoGalleryComponent.formGroup.setParent(this.formGroup); 
  }

  initForm() {
    this.initEmptyForm(this.formBuilder);
  }

  async onSubmit() {
    this.images = this.photoGalleryComponent.onSubmit();

    try{
      this.infoModal=new ModalSavePhotosModel();
      if(this.infoModal) {
        this.infoModal.id = this.activityId;
        this.infoModal.images = this.images;
        this.infoModal.apiUrl = Environment.photoActivityApiUrl;

        let promises = [];
        this.modalRef = this.dialog.open( ModalSavePhotosComponent, {
          disableClose: true,
          height: GeneralDescriptionEnum.heightModal.toString(),
          width: GeneralDescriptionEnum.weidthModal.toString(),      
          data: {
            infoModal : this.infoModal,
          }
        });
        promises = (await this.modalRef.afterClosed().toPromise());
        return promises;
      }
    }
    catch(e) {
      return e;
    }
  }

  // TODO este metodo es el que deberá ser invocado en el proceso de edicion de fotos
  loadPhotos(){
    this.photoGalleryComponent.loadPhotos();
  }

}
