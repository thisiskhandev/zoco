import { Component, OnInit } from '@angular/core';
import { faPen, faTrashAlt, faCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

import { FileHandle } from '../shared/drag.directive';


@Component({
  selector: 'app-photo-hotel',
  templateUrl: './photo-hotel.component.html',
  styleUrls: ['./photo-hotel.component.css']
})
export class PhotoHotelComponent implements OnInit {
  faPen = faPen;
  faTrashAlt = faTrashAlt;
  faCircle = faCircle;
  faPlus = faPlus;
  
  title = 'dropzone';

  files: Array<any> = [];


  constructor() { }

  ngOnInit(): void {
  }

  filesDropped(files: FileHandle[]): void {
    for(let file of files) {
      this.files.push(file);
    }
  }

  upload(): void {
    //get image upload file obj;
  }


  

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  hola(event: any): void {
    console.log("Me presiono");
    console.log("Me presiono");
    console.log("Me presiono");
    console.log("Me presiono");
    console.log("Me presiono");
    console.log(event);
  }
}
