import { Component, OnInit, Input, ViewChild, SimpleChanges } from '@angular/core';
import { PhotosHotelEnum } from './shared/photos-hotel-enum';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PhotoGalleryModel } from '@commons/photo-gallery/shared/photo-gallery-model';
import { FormBuilder } from '@angular/forms';
import { PhotoGalleryComponent } from '@commons/photo-gallery/photo-gallery.component';
import { ModalSavePhotosComponent } from '@commons/modal-save-photos/modal-save-photos.component';
import { ModalSavePhotosModel } from '@commons/modal-save-photos/shared/modal-save-photos-model';
import { Environment } from 'environments/environment';
import { AbstractGenericParentComponent } from '@shared/abstract-generic-parent.component';
import { PhotosHotelModel } from '@hotel/photos-hotel/shared/photos-hotel-model';
import { Utilities } from '@shared/utilities';

@Component({
  selector: 'app-photos-hotel',
  templateUrl: './photos-hotel.component.html',
  styleUrls: ['./photos-hotel.component.css']
})
export class PhotosHotelComponent extends AbstractGenericParentComponent implements OnInit {

  @Input() establishmentId: number;
  @ViewChild (PhotoGalleryComponent) photoGalleryComponent : PhotoGalleryComponent;
  public photosEnum = PhotosHotelEnum;  
  images : PhotoGalleryModel [];  
  modalRef: MatDialogRef <ModalSavePhotosComponent>;
  infoModal: ModalSavePhotosModel;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {
    super();

    this.model = new PhotosHotelModel();
    
    this.images = [];
  }

  ngOnInit() {
    this.initForm();
  }

  ngAfterViewInit() {
    this.formGroup.addControl(PhotosHotelEnum.photosHotel, this.photoGalleryComponent.formGroup);
    this.photoGalleryComponent.formGroup.setParent(this.formGroup); 

  }

  initForm(){
    this.formGroup = this.formBuilder.group( {
    });    
  }

  async onSubmit() {
    this.images = this.photoGalleryComponent.onSubmit();

    try{
      this.infoModal=new ModalSavePhotosModel();
      if(this.infoModal) {
        this.infoModal.id = this.establishmentId;
        this.infoModal.images = this.images;
        this.infoModal.apiUrl = Environment.photoApiUrl;

        let promises = [];
        this.modalRef = this.dialog.open( ModalSavePhotosComponent, {
          disableClose: true,
          height: PhotosHotelEnum.heightModal.toString(),
          width: PhotosHotelEnum.widthModal.toString(),   
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

  transformGroupToModel(){}

  loadPhotos() {
    this.photoGalleryComponent.loadPhotos();
  }
 

}
