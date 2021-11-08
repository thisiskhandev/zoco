import { Component, OnInit, Input, OnChanges, SimpleChanges  } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { DetailsHotelEnum } from '../shared/view-details-hotel-enum';
import { ImagesHotel } from '../shared/view-details-hotel-images';
import { GenericModel } from '@shared/generic-model';
import { Utilities } from '@shared/utilities';

@Component({
  selector: 'app-hotel-images',
  templateUrl: './hotel-images.component.html',
  styleUrls: ['./hotel-images.component.css']
})
export class HotelImagesComponent implements OnInit {
    activeSliderId: string;
    DetailsHotelEnum: typeof DetailsHotelEnum = DetailsHotelEnum;
    @Input() images: Array<GenericModel> = [];
    utilities:Utilities = new Utilities();

    cycleToSlide(index) {
        this.activeSliderId = DetailsHotelEnum.slyde + index;
    }

    constructor(config: NgbCarouselConfig) {
        config.interval = 10000;
        config.wrap = true;
        config.keyboard = false;
    }

    ngOnInit() {
    }

    isImagesReady(): boolean {
        return this.images && this.images.length > this.utilities.emptyLength;
    }

}
