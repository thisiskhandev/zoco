import { Component, OnInit, ViewEncapsulation, Input, HostListener, OnChanges, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@commons/confirm-dialog/confirm-dialog.component';
import { PhotoGalleryEnum } from './shared/photo-gallery-enum';
import { PhotoGalleryModel } from './shared/photo-gallery-model';
// import { DragulaService } from 'ng2-dragula';
import { Utilities } from '@shared/utilities';
import { AbstractGenericFormComponent } from '@shared/abstract-generic-form.component';

import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PhotoGalleryComponent extends AbstractGenericFormComponent implements OnInit {

  @Input() id: number;
  @Input() photoGalleryArray : Array<PhotoGalleryModel>;
  dialogRef: MatDialogRef <ConfirmDialogComponent>;
  public photoGalleryEnum = PhotoGalleryEnum;
  dragAreaClass: string = PhotoGalleryEnum.dragarea;
  images : PhotoGalleryModel [];
  count : number;
  lastIndex : number;
  index : number = 1;
  werePhotosLoaded : boolean = false;

  constructor(private formBuilder: FormBuilder, 
   // private dragula: DragulaService, 
    public dialog: MatDialog) {
      super();

      this.images = [];

      this.count = PhotoGalleryEnum.valueZero;
      this.lastIndex = PhotoGalleryEnum.valueOne;
      
    /*  if (this.dragula.find(PhotoGalleryEnum.dragulaItem)) {
        this.dragula.destroy(PhotoGalleryEnum.dragulaItem);
      }

      this.dragula.createGroup(PhotoGalleryEnum.dragulaItem, {
        revertOnSpill: true
      });*/
  }

  ngOnInit() {
    this.model = new PhotoGalleryModel();
    this.initForm();
  }
  
  initForm() {
    this.formGroup = this.formBuilder.group( {
      photos: [this.model.image, Validators.required]
    });
  }

  onSubmit() {
    this.werePhotosLoaded = true;
    return this.photoGalleryArray;
    // return this.images;
  }

  transformGroupToModel() {}

  loadPhotos() {
    let This: this = this;

    setTimeout(function() { 
      if(This.photoGalleryArray) {
        if(This.photoGalleryArray.length > PhotoGalleryEnum.valueZero && !This.werePhotosLoaded) {

          for(let photosArray of This.photoGalleryArray) {
            This.saveImages(photosArray.image, photosArray.id);
          }

          This.werePhotosLoaded = true;
        }
      }
     }, 500);
  }

  filesSelected(event: Event) {
    let fileList = (<HTMLInputElement>event.target).files;

    for(let i=0; i<fileList.length; i++)
      this.saveImages( fileList[i], null );
  }

  saveImages(photo, idPhoto) {
    let preview = document.getElementById(PhotoGalleryEnum.previewElement);
    
    let file = photo;
    let id = idPhoto;

    if (!file.type.startsWith(PhotoGalleryEnum.typeFile)) { 
      return;
    }

    let span = this.appendSpan();
    let img = this.appendImage(file, id);      
    span.appendChild(img);
    
    var reader = new FileReader();
    reader.onload = (
      function(aImg) { 
        return function(e) { 
          aImg.src = e.target.result; 
        }; 
      }
      )(img);
    reader.readAsDataURL(file);
    
    let check = this.appendCheck();    
    span.appendChild(check);
    
    preview.appendChild(span);

    this.lastIndex++;
    if( this.images.length > PhotoGalleryEnum.valueZero ) {
      this.formGroup.controls[PhotoGalleryEnum.componentForm].setErrors(null);
    }

  }

  appendSpan() {
    let span = document.createElement(PhotoGalleryEnum.spanElement);
    span.classList.add(PhotoGalleryEnum.spanClass);
    span.setAttribute(PhotoGalleryEnum.idAttribute, PhotoGalleryEnum.spanElement+this.lastIndex);
    return span;
  }

  appendImage(file, id) {
    let img = (<HTMLImageElement>document.createElement(PhotoGalleryEnum.tagImage));
    img.classList.add(PhotoGalleryEnum.imageClass);
    img.setAttribute(PhotoGalleryEnum.fileAttribute, file);

    let model = new PhotoGalleryModel();

    if(model) {
      model.image = file;
      model.checkboxId = PhotoGalleryEnum.checkboxId+this.lastIndex;
      model.checked = Utilities.falseString;
      model.spanId = PhotoGalleryEnum.spanElement+this.lastIndex;
      model.id = id;
      this.images.push(model);

      // Si el ID esta en null es porque se estan subiendo nuevas fotos y se debe guardar en el arreglo que actualiza la informacion en el api.
      if(!id){
        const newPhoto = new PhotoGalleryModel;
        newPhoto.id = id;
        newPhoto.image = file;
        this.photoGalleryArray.push(newPhoto);
      }
    }

    return img;
  }

  appendCheck() {
    let check = (<HTMLInputElement>document.createElement(PhotoGalleryEnum.inputElement));
    var obj = this;

    check.classList.add(PhotoGalleryEnum.checkboxClass);
    check.setAttribute(PhotoGalleryEnum.typeAttribute, PhotoGalleryEnum.typeElement);
    check.setAttribute(PhotoGalleryEnum.idAttribute, PhotoGalleryEnum.checkboxId+this.lastIndex);
    
    check.addEventListener(PhotoGalleryEnum.listenerClick, function(e){
      if((<HTMLInputElement>e.target).checked){
        obj.count++;
        let index = obj.images.map(function(e) { return e.checkboxId; }).indexOf((<HTMLInputElement>e.target).id);
        if(index >= PhotoGalleryEnum.valueZero)
          obj.images[index].checked = Utilities.trueString;
      }      
      else {
        obj.count--;
        let index = obj.images.map(function(e) { return e.checkboxId; }).indexOf((<HTMLInputElement>e.target).id);
        if(index >= PhotoGalleryEnum.valueZero)
          obj.images[index].checked = Utilities.falseString;
      }
    });
    
    return check;
  }
  

  // @HostListener(PhotoGalleryEnum.dragover, ['$event']) onDragOver(event) {
  @HostListener("dragover", ['$event']) onDragOver(event) {
    this.dragAreaClass = PhotoGalleryEnum.droparea;
    event.preventDefault();
  }

  // @HostListener(PhotoGalleryEnum.dragenter, ['$event']) onDragEnter(event) {
  @HostListener("dragenter", ['$event']) onDragEnter(event) {
    this.dragAreaClass = PhotoGalleryEnum.droparea;
    event.preventDefault();
  }

  // @HostListener(PhotoGalleryEnum.dragend, ['$event']) onDragEnd(event) {
    @HostListener("dragend", ['$event']) onDragEnd(event) {
    this.dragAreaClass = PhotoGalleryEnum.dragarea;
    event.preventDefault();
  }

  // @HostListener(PhotoGalleryEnum.dragleave, ['$event']) onDragLeave(event) {
    @HostListener("dragleave", ['$event']) onDragLeave(event) {
    this.dragAreaClass = PhotoGalleryEnum.dragarea;
    event.preventDefault();
  }

  // @HostListener(PhotoGalleryEnum.drop, ['$event']) onDrop(event) {   
    @HostListener("drop", ['$event']) onDrop(event) {   
    this.dragAreaClass = PhotoGalleryEnum.dragarea;           
    event.preventDefault();
    event.stopPropagation();
    var files = event.dataTransfer.files;
    
    for(let i = 0; i < files.length; i++)
      this.saveImages(files[i], null);
  }

  selectAll() {
    this.count = this.images.length;

    for(let photosArray of this.images) {
      let id = photosArray.checkboxId;

      (<HTMLInputElement>document.getElementById(id)).checked = true;
      
      photosArray.checked = Utilities.trueString;
    }
  }

  deselectAll() {
    this.count = 0;

    for(let photosArray of this.images) {
      let id = photosArray.checkboxId;
      (<HTMLInputElement>document.getElementById(id)).checked = false;
      photosArray.checked = Utilities.falseString;
    }
  }

  deletePhotos() {
    this.dialogRef = this.dialog.open( ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = PhotoGalleryEnum.deletePhotosMessage;

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.remove();
      }
      this.dialogRef = null;
    });
  }

  remove() {
    let elements = [];

    for(let photosArray of this.images) {
      if(photosArray.checked == Utilities.trueString) {
        let span = document.getElementById(photosArray.spanId);

        span.remove();
        elements.push(photosArray.spanId);

        this.count--;
        this.markPhotoToRemove(photosArray.image);
      }
    }

    for(let element of elements) {
      let index = this.images.map(function(e) { return e.spanId; }).indexOf(element);

      if(index >= PhotoGalleryEnum.valueZero ) {
        this.images.splice(index, PhotoGalleryEnum.valueOne);
        this.photoGalleryArray.splice(index, PhotoGalleryEnum.valueOne);
      }
    }

    if( this.images.length == PhotoGalleryEnum.valueZero )
      this.formGroup.controls[PhotoGalleryEnum.componentForm].setErrors({[PhotoGalleryEnum.incompleteString] : true});
  }

  markPhotoToRemove(file : File) {
    let element = this.photoGalleryArray.find(this.findIndexToUpdate, file.name);
    let index = this.photoGalleryArray.indexOf(element);

    if(index > PhotoGalleryEnum.negativeValue && this.photoGalleryArray[index].id)
      this.photoGalleryArray[index].method = PhotoGalleryEnum.deleteMethod;
    else if(!this.photoGalleryArray[index].id)
      this.photoGalleryArray.splice(index, PhotoGalleryEnum.valueOne);
  }

  findIndexToUpdate(data) { 
    return data.image.name === this;
  }

}
