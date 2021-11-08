import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AbstractHotelGenericFormComponent } from '@hotel/shared/abstract-hotel-generic-form.component';
import { HotelService } from '../../shared/hotel.service';
import { LocationModel } from './shared/location-model';
import { LocationEnum } from './shared/location-enum';
import { FormArray, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { BasicInformationEnum } from '../shared/basic-information-enum';
import { Utilities } from '@shared/utilities';
import { CookieService } from 'ngx-cookie-service';
import { CountryService } from '../shared/country.service';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css', './../../shared/hotel.css'],
  providers: [CountryService]
})
export class LocationComponent extends AbstractHotelGenericFormComponent implements OnInit, AfterViewInit {

  BasicInformationEnum: typeof BasicInformationEnum = BasicInformationEnum;
  LocationEnum: typeof LocationEnum = LocationEnum;
  modelAux: Object = {};
  phonesModel: Object = {};
  filesToUpload: any;
  payload: any;

 @ViewChild("gmap") gmapElement: any;
 @ViewChild("autocomplete") autocompleteElem; 

  map: google.maps.Map;
  geocoder: google.maps.Geocoder;
  autocomplete: google.maps.places.Autocomplete;
  marker: google.maps.Marker;

  iataCode : string;
  
  phoneCountries: Array<any>;
  countries: any;
  states: any;

  maxPhoneItems = 1;


  componentForm: Object = {
    street_number: LocationEnum.googleMapLongName,
    route: LocationEnum.googleMapLongName,
    locality: LocationEnum.googleMapLongName,
    sublocality_level_1: LocationEnum.googleMapLongName,
    administrative_area_level_1: LocationEnum.googleMapLongName,
    administrative_area_level_2: LocationEnum.googleMapLongName,
    country: LocationEnum.googleMapLongName,
    postal_code: LocationEnum.googleMapShortName,
    iataCode: LocationEnum.googleMapShortName,
  };

  constructor(private formBuilder: FormBuilder, private hotelService: HotelService, private cookieService: CookieService, private locationService: CountryService ) { 
    super();
    this.model = new LocationModel();
  }

  ngOnInit() {
    this.initForm();
    this.getCountries();
    this.getPhoneCountries();

    this.viewChildComponentsStatus = new Array<boolean>();

    for(let i = 0; i < LocationEnum.childComponentQuantity; i++) {
      this.viewChildComponentsStatus.push(false);
    }
  }

  ngAfterViewInit() {
    // this.initMap();   
  }

  initForm() {
    this.formGroup = this.formBuilder.group( {
      locationReference: [this.model.locationReference, 
              Validators.compose([ Validators.required,
              Validators.maxLength(LocationEnum.locationReferenceMaxSize)])],
      city: [this.model.city, Validators.required],
      state: [this.model.state, Validators.required],
      country: [this.model.country, Validators.required],
      zipCode: [this.model.zipCode, Validators.required],
      // geo_coordinates: new FormControl({value: this.model.geo_coordinates, disabled: true}, Validators.required),
      
      // New fields
      cuit_rif: [this.model.cuit_rif, Validators.required],
      establishmentName: [this.model.establishmentName, Validators.required],
      home_address: [this.model.home_address, Validators.required],
      email: [this.model.email],
      logo_path: [this.model.logo_path, Validators.required]
    });
    
    this.formListener();
    
    //this.setValueChangeListener();   
    //this.isValid.emit(this.formGroup.valid);
  }

  formListener(): void {
    this.formGroup.valueChanges.subscribe( () => {
      this.isFormValid();
    });
  }

  setValid(validPosition: number, value: boolean): void {
    this.viewChildComponentsStatus[validPosition] = value;
    
    this.isFormValid();
  }

  isFormValid(): boolean {
    if( (this.formGroup.valid) && (this.isEveryChildComponentValid()) ) {
      this.isValid.emit(true);

      return true;
    }
    else {
      this.isValid.emit(false);

      return false;
    }
  }

  getCountries() {
    this.locationService.getCountries().subscribe(
      (response: any) => {
        this.countries = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  getStates(countryID: string) {
    this.locationService.getStatesByCountry(countryID).subscribe(
      (response: any) => {
          this.states = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  getPhoneCountries() {
    this.phoneCountries = [];
    this.locationService.getPaises().subscribe((val:any) => 
      { 
        val.forEach(country => {
          const countryArray = country as Array<string>;
          if(country.callingCodes[0]) {
            if(country.name != "Canada") {
              this.phoneCountries.push({'callingCode': country.callingCodes[0], 'countryName': country.name, 'iataCode': country.alpha2Code  });
            }
            else {
              country.callingCodes[0] = 11;
              this.phoneCountries.push({'callingCode': country.callingCodes[0], 'countryName': country.name, 'iataCode': country.alpha2Code  });
            }
          }
        });
    });
  }

  onSubmit() {
    if(this.isFormValid()) {
      this.setModelAux();

      this.transformGroupToModel();
  
      this.modelAux = new LocationModel();
  
      // this.validateMapInfo();
    }
  }

  setModelAux(): void {
    this.modelAux = {
      "locationReference": "",
      "state": "",
      "city": "",
      "country": "",
      "zipCode": "",
      "cuit_rif": "",
      "establishmentName": "",
      "home_address": "",
      "logo_path": "",
      "email": ""
    }
  }

  transformGroupToModel(): void {
    if(this.formGroup.valid) {
      
      let formField: AbstractControl;
      
      for(let attribute in this.modelAux) {
        
        formField = this.formGroup.get(attribute) as FormArray;
  
        if( (formField.dirty) || (attribute === "logo_path") ) {
          this.model[attribute] = formField.value;
          
          // The control is reset to put "dirty = false", while preserving the initial value
          formField.reset();
          formField.setValue(this.model[attribute]);
          this.formGroup.setControl(attribute, formField);
        }
        else if(!formField.dirty) {
          delete this.model[attribute];
        }
      }
    } else if(!this.formGroup.dirty) {
      this.model = {};
      
      console.log("Invalid form or has not been modified. LOCATION");
      console.log(this.formGroup);
    }

    if(Object.entries(this.phonesModel).length != 0) {
      for(let property in this.phonesModel) {
        this.model[property] = this.phonesModel[property];
      }
      this.phonesModel = {};
    }

    this.model["filesToUpload"] = this.payload.filesToUpload;
    this.model["nameFolder"] = this.payload.nameFolder;
  }

  setPhone(phone: any, prefix: string) {
    let property: string = `${prefix}_phone_number`;
    let value: string = `+${phone.callingCode}-${phone.phone}`;

    this.phonesModel[property] = value;
  }

  validateMapInfo() {
    if(this.formGroup.get(LocationEnum.city).value == LocationEnum.emptyString || 
    this.formGroup.get(LocationEnum.state).value == LocationEnum.emptyString || 
    this.formGroup.get(LocationEnum.country).value == LocationEnum.emptyString || 
    this.formGroup.get(LocationEnum.geo_coordinates).value == LocationEnum.emptyString){      
      if(this.formGroup.get(LocationEnum.city).value == LocationEnum.emptyString)
        document.getElementById(LocationEnum.cityLabel).style.color = LocationEnum.errorColor;
      if(this.formGroup.get(LocationEnum.state).value == LocationEnum.emptyString)
        document.getElementById(LocationEnum.stateLabel).style.color = LocationEnum.errorColor;
      if(this.formGroup.get(LocationEnum.country).value == LocationEnum.emptyString)
        document.getElementById(LocationEnum.countryLabel).style.color = LocationEnum.errorColor;
      if(this.formGroup.get(LocationEnum.geo_coordinates).value == LocationEnum.emptyString)
        document.getElementById(LocationEnum.coordinatesLabel).style.color = LocationEnum.errorColor;
    }
    else {
      document.getElementById(LocationEnum.cityLabel).style.color = LocationEnum.origColor;
      document.getElementById(LocationEnum.stateLabel).style.color = LocationEnum.origColor;
      document.getElementById(LocationEnum.countryLabel).style.color = LocationEnum.origColor;
      document.getElementById(LocationEnum.coordinatesLabel).style.color = LocationEnum.origColor;
    }
  }

  // Implementa todas las funciones para administrar el Mapa
 
  // initMap() {
  //   const structuredGeoCoordinates = this.model.geo_coordinates.split(LocationEnum.googleMapStringSeparator);
  //   let selectedZoom: number = (this.hotelCompleteInfo)? LocationEnum.googleMapFinalZoom : LocationEnum.googleMapInitialZoom;
  
  //   var mapOptions = {
  //     center: new google.maps.LatLng(structuredGeoCoordinates[this.utilities.emptyLength],structuredGeoCoordinates[LocationEnum.googleMapInitialZoom]),
  //     zoom: selectedZoom,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP
  //   };
  
  //   if(!this.hotelCompleteInfo) {
  //     this.model.geo_coordinates = '';
  //   }
  
  //   this.map = new google.maps.Map(this.gmapElement.nativeElement, mapOptions);
  
  //   this.geocoder = new google.maps.Geocoder;
  
  //   this.map.set(LocationEnum.googleMapParent, this);
  
  //   this.map.addListener(LocationEnum.googleMapClickEvent, function(e){
  
  //     //this.parent.placeMarkerAndPanTo(e.latLng);
  //     //this.parent.geocodeLatLng( e.latLng);
  //   });
  
  //   if(this.isEdit(this.cookieService)){
  //     this.placeMarkerAndPanTo(mapOptions.center);
  //     this.iataCode = this.model.iata_code;
  //   }
  
  //   this.initAutocomplete();
  // }

 placeMarkerAndPanTo(latLng) {
  //Valida si ya existe un marcador en el mapa para borrarlo
  if(this.marker != null) {
    this.marker.setMap(null); // Borra un marcador del mapa
		this.marker = null;       // Elimina el marcador
  }
    
	this.marker = new google.maps.Marker({
		position: latLng,
		map: this.map
  });
 }

 initAutocomplete(){
    // Crea el objeto de autocompletar, restringe la búsqueda al tipo de locación geográfica
    this.autocomplete = new google.maps.places.Autocomplete (this.autocompleteElem.nativeElement, {types: ['geocode']});
    this.autocomplete.set(LocationEnum.googleMapParent, this);

    // Cuando el usuario selecciona una direccion desde el dropdown, se llenan los campos de la forma.
    this.autocomplete.addListener(LocationEnum.googleMapPlaceChanged, function() {
      //this.parent.fillInAddress();
    });
 }

 geocodeLatLng(latLng){   
   var latlngGeo = {lat: parseFloat(latLng.lat()), lng: parseFloat(latLng.lng())};
   var addressArray = [];
   var obj = this;

   this.geocoder.geocode({'location': latlngGeo}, function(results, status) {
     if (status.toString() === LocationEnum.googleMapOkStatus) {
       if (results[LocationEnum.googleMapInitialZoom]) {
         obj.autocompleteElem.nativeElement.value = results[LocationEnum.googleMapFirstArrayPosition].formatted_address;
         
         for(var i=0; i< results[LocationEnum.googleMapFirstArrayPosition].address_components.length; i++){
           var addressType = results[LocationEnum.googleMapFirstArrayPosition].address_components[i].types[LocationEnum.googleMapFirstArrayPosition];
           // Se pregunta si el componente de la dirección leído se desea tomar en cuenta
           if(obj.componentForm[addressType]){               
             // Se guarda el componente de la direccion en el arreglo
             addressArray[addressType] = results[LocationEnum.googleMapFirstArrayPosition].address_components[i][obj.componentForm[addressType]]; 
             // Si es pais, se lee el short name
             if(addressType == LocationEnum.country) {
              addressArray[LocationEnum.iataCode] = results[LocationEnum.googleMapFirstArrayPosition].address_components[i][obj.componentForm[LocationEnum.iataCode]];
             }         
            }
          }

          obj.formGroup.get(LocationEnum.home_address).setValue(results[0].formatted_address);
          obj.formGroup.get(LocationEnum.city).setValue(addressArray[LocationEnum.googleMapLocality]!=null ? addressArray[LocationEnum.googleMapLocality] : LocationEnum.emptyString);
          obj.formGroup.get(LocationEnum.state).setValue(addressArray[LocationEnum.googleMapAdminArea]!=null ? addressArray[LocationEnum.googleMapAdminArea] : LocationEnum.emptyString);
          obj.formGroup.get(LocationEnum.country).setValue(addressArray[LocationEnum.country]!=null ? addressArray[LocationEnum.country] : LocationEnum.emptyString);
          obj.formGroup.get(LocationEnum.zipCode).setValue(addressArray[LocationEnum.googleMapPostalCode]!=null ? addressArray[LocationEnum.googleMapPostalCode] : LocationEnum.emptyString);
          obj.formGroup.get(LocationEnum.geo_coordinates).setValue(latLng.lat() + LocationEnum.googleMapStringSeparator + latLng.lng());
          obj.iataCode = addressArray[LocationEnum.iataCode]!=null ? addressArray[LocationEnum.iataCode] : LocationEnum.emptyString; 

        } else {
          obj.hotelService.showError(LocationEnum.googleMapNoResultMsg);
        }
      } else {
        obj.hotelService.showError(LocationEnum.googleMapGeoCoderFaildMsg + status);
      }
    });
 }  

 fillInAddress() {
    // Obtiene los detalles del lugar desde el objecto autocomplete.  
    var place = this.autocomplete.getPlace();
      
    var service = new google.maps.places.PlacesService(this.map);
    var addressArray = [];

    for(var i=0; i< place.address_components.length; i++){
      var addressType = place.address_components[i].types[LocationEnum.googleMapFirstArrayPosition];
      // Se pregunta si el componente de la dirección leído se desea tomar en cuenta
      if(this.componentForm[addressType]){
        // Se guarda el componente de la direccion en el arreglo
        addressArray[addressType] = place.address_components[i][this.componentForm[addressType]];
        // Si es pais, se lee el short name
        if(addressType == LocationEnum.country) {
          addressArray[LocationEnum.iataCode] = place.address_components[i][this.componentForm[LocationEnum.iataCode]];
         }   
      }          
    }
  
    // Se construye la dirección final agregando como campos adicionales el: sublocality_level_1 y administrative_area_level_2 en caso de existir
    var placeAddress = place.name;
    var subloc_1 = addressArray[LocationEnum.googleMapSublocalityLvlOne];
    var adm_2 = addressArray[LocationEnum.googleMapAdminAreaTwo];
    this.formGroup.get(LocationEnum.home_address).setValue(subloc_1!=null ? 
        placeAddress+LocationEnum.googleMapStringSeparator+subloc_1 : 
        (adm_2!=null ? placeAddress+LocationEnum.googleMapStringSeparator+adm_2 : placeAddress));
    
    this.formGroup.get(LocationEnum.city).setValue(addressArray[LocationEnum.googleMapLocality]!=null ?
       addressArray[LocationEnum.googleMapLocality] : LocationEnum.emptyString);
    this.formGroup.get(LocationEnum.state).setValue(addressArray[LocationEnum.googleMapAdminArea]!=null ?
       addressArray[LocationEnum.googleMapAdminArea] : LocationEnum.emptyString);
    this.formGroup.get(LocationEnum.country).setValue(addressArray[LocationEnum.country]!=null ?
       addressArray[LocationEnum.country] : LocationEnum.emptyString);
    this.formGroup.get(LocationEnum.zipCode).setValue(addressArray[LocationEnum.googleMapPostalCode]!=null ? 
      addressArray[LocationEnum.googleMapPostalCode] : LocationEnum.emptyString);
    this.formGroup.get(LocationEnum.geo_coordinates).setValue(place.geometry.location.lat() + 
    LocationEnum.googleMapStringSeparator +  place.geometry.location.lng());
    // Se guarda el codigo del pais. Este valor no se muestra en el front pero si se guarda en base de datos
    this.iataCode = addressArray[LocationEnum.iataCode]!=null ? addressArray[LocationEnum.iataCode] : LocationEnum.emptyString; 

    // Se centra el mapa en las coordenadas dadas
    this.map.setCenter (place.geometry.location);
    this.map.setZoom (LocationEnum.googleMapFinalZoom);

    // Se agrega el marcador al mapa
    this.placeMarkerAndPanTo(place.geometry.location);

  }

  geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        
        this.autocomplete.setBounds(circle.getBounds());
      });
    }
  }

  // Logo Logic

  /*loadForm() {
    this.formGroup = new FormGroup({
      file: new FormControl('', Validators.required)
     });
  }*/


  setForm() {
    this.payload = {
         //icono: this.filesToUpload.name,
         filesToUpload: this.filesToUpload,
         nameFolder: 'hotel/logo_hotel'
    }
  }

  
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <HTMLInputElement>fileInput.target.files[0];
    this.formGroup.controls['logo_path'].setValue(this.filesToUpload ? this.filesToUpload.name : '');

    var  preview: HTMLImageElement = document.querySelector('img#preview');
    var reader = new FileReader();

    reader.onloadend = function () {// @ts-ignore
    preview.src = reader.result;
    }
    if (this.filesToUpload) {
      reader.readAsDataURL(this.filesToUpload);
    } else {
      preview.src = "";
    }
  }

  selectFile(e: File[] ,fileInput: any){
    const [file] = e;
    const { name: fileName, size } = file;
    const fileSize = (size / 1000).toFixed(2);
    const fileNameAndExt = `${(fileName.length > 10)?fileName.slice(0,6) + '[..]' : fileName}.${fileName.split('.')[fileName.split('.').length - 1]}`;

    document.querySelector('.file-name').textContent = fileNameAndExt;

    this.filesToUpload = <HTMLInputElement>fileInput.target.files[0];

    this.formGroup.controls['logo_path'].setValue(this.filesToUpload ? this.filesToUpload.name : '');


    const preview: HTMLImageElement = document.querySelector('img#preview');
    const reader = new FileReader();

    reader.onloadend = function () { // @ts-ignore
      preview.src = reader.result;
      preview.width=250;
    }

    this.setForm();

    if (this.filesToUpload) {
      reader.readAsDataURL(this.filesToUpload);
    } else {
      preview.src = "";
    }

    // setForm() {
    //   this.payload = {
    //        icono: this.filesToUpload.name,
    //        filesToUpload: this.filesToUpload,
    //        nameFolder: 'type_payment_conditions'
    //   }
    // }
  }

}
