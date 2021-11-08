import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-info-product-hotel',
  templateUrl: './info-product-hotel.component.html',
  styleUrls: ['./info-product-hotel.component.css']
})
export class InfoProductHotelComponent implements OnInit, OnChanges {

  @Input() hotelCompleteInfo: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    console.log("INFO DEL PRODUCTO. this.hotelCompleteInfo");
    console.log(this.hotelCompleteInfo);
  }

}
