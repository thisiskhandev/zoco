import { Injectable } from '@angular/core';
import { Environment } from 'environments/environment';
import { faPlane, faBus, faTrain } from '@fortawesome/free-solid-svg-icons';


import { InfoPropertyHotelEnum } from './info-property-hotel-enum';
import { InfoPropertyHotelModel } from './info-property-hotel-model';
import { AbstractService } from '@shared/abstract.service';

@Injectable()
export class InfoPropertyHotelService extends AbstractService {

  private itemsAmenities = Environment.itemsAmenities;
  faPlane = faPlane;
  faBus = faBus;
  faTrain = faTrain;

  getAmenitiesTypes(): any {
    try {
      return this.http.get(this.itemsAmenities);
    }
    catch(error){
        this.handleError(error);
    }
  }
    
  getPlaces(): any {
    let response: any = [
        {
          text: 'Hotel',
          value: 'Hotel'
        },
        {
          text: 'Restaurante',
          value: 'Restaurant'
        },
        {
          text: 'Casa',
          value: 'House'
        },
        {
          text: 'Cabaña',
          value: 'Cabin'
        },
    ];


    try {
      //return this.http.get(this.customerTypesUrl);

      return response;
    }
    catch(error){
      this.handleError(error);
    }
  }

  getItemsList(): any {
    let response: any = [
      {
        indication: '25 minutos en avión',
        distance: '1 Km',
        place: 'Hotel',
        icon: this.faPlane
      },
      {
        indication: '1 hora en bus',
        distance: '2 Km',
        place: 'Restaurante',
        icon: this.faBus
      },
      {
        indication: '45 hora en tren',
        distance: '3 Km',
        place: 'Casa',
        icon: this.faTrain
      },
    ];


    try {
      //return this.http.get(this.customerTypesUrl);

      return response;
    }
    catch(error){
      this.handleError(error);
    }
  }

  getIconsList(): any {
    let response: any = [
      {
        icon: this.faPlane,
        value: 'faPlane', 
        text: 'Aeropuerto'
      },
      {
        icon: this.faBus,
        value: 'faBus', 
        text: 'Bus'
      },
      {
        icon: this.faTrain,
        value: 'faTrain', 
        text: 'Tren'
      }
    ];

    try {
      //return this.http.get(this.customerTypesUrl);

      return response;
    }
    catch(error){
      this.handleError(error);
    }
  }

}
