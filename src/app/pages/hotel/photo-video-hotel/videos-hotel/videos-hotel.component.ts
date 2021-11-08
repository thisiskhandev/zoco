import { Component, OnInit } from '@angular/core';
import { faPen, faTrashAlt, faCircle, faPlus, faVideo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-videos-hotel',
  templateUrl: './videos-hotel.component.html',
  styleUrls: ['./videos-hotel.component.css']
})
export class VideosHotelComponent implements OnInit {
  faPen = faPen;
  faTrashAlt = faTrashAlt;
  faCircle = faCircle;
  faPlus = faPlus;
  faVideo = faVideo
  title = 'dropzone';
  
  files: File[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onRemove(event) {
    console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
    console.log('this.files');
		console.log(this.files);
  }

  onSelect(event) {
    console.log(event);
		this.files.push(...event.addedFiles);
		console.log('this.files');
		console.log(this.files);

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
