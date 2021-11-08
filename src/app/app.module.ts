import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { AppComponent } from './app.component';
import { BasicInformationHotelComponent } from './pages/hotel/basic-information-hotel/basic-information-hotel.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { HotelService } from './pages/hotel/shared/hotel.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/InMemoryData.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomValidator } from '@shared/customValidator';
import { BasicInformationValidator } from './pages/hotel/basic-information-hotel/shared/basic-information-validator';
import { GeneralDescriptionHotelComponent } from './pages/hotel/general-description-hotel/general-description-hotel.component';
import { BaseNavigatorComponent } from './pages/base-navigator/base-navigator.component';
import { NavigatorHotelComponent } from './pages/hotel/navigator-hotel/navigator-hotel.component';
import { InternetComponent } from './pages/hotel/general-description-hotel/internet/internet.component';
import { ParkingComponent } from './pages/hotel/general-description-hotel/parking/parking.component';
import { BreakfastComponent } from './pages/hotel/general-description-hotel/breakfast/breakfast.component';
import { BreakfastService } from './pages/hotel/general-description-hotel/breakfast/shared/breakfast.service';
import { LanguageComponent } from '@commons/language/language.component';
import { LanguageService } from '@commons/language/shared/language.service';
import { InternetService } from './pages/hotel/general-description-hotel/internet/shared/internet.service';
import { ParkingService } from './pages/hotel/general-description-hotel/parking/shared/parking.service';
import { RoomItemsComponent } from './pages/hotel/layout/room-items/room-items.component';
import { FacilitiesComponent } from './pages/hotel/general-description-hotel/facilities/facilities.component';
import { LayoutComponent } from './pages/hotel/layout/layout.component';
import { RoomInfoComponent } from './pages/hotel/layout/room-info/room-info.component';
import { BedInfoComponent } from './pages/hotel/layout/bed-info/bed-info.component';
import { RoomPriceComponent } from './pages/hotel/layout/room-price/room-price.component';
import { GeneralDescriptionHotelService } from './pages/hotel/general-description-hotel/shared/general-description-hotel.service';
import { FacilitiesService } from './pages/hotel/general-description-hotel/facilities/shared/facilities.service';
import { RoomInfoService } from './pages/hotel/layout/room-info/shared/room-info.service';
import { BedInfoService } from './pages/hotel/layout/bed-info/shared/bed-info.service';
import { LayoutService } from './pages/hotel/layout/shared/layout.service';
import { BaseListComponent } from './pages/base-list/base-list.component';
import { ListHotelComponent } from './pages/hotel/list-hotel/list-hotel.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AmenitiesHotelComponent } from './pages/hotel/amenities-hotel/amenities-hotel.component';
import { PhotosHotelComponent } from './pages/hotel/photos-hotel/photos-hotel.component';
import { PaymentPoliciesHotelComponent } from './pages/hotel/payment-policies-hotel/payment-policies-hotel.component';
import { ListHotelService } from './pages/hotel/list-hotel/shared/list-hotel.service';
import { ListTransferComponent } from './pages/transfer/list-transfer/list-transfer.component';
import { ListActivitiesComponent } from './pages/activities/list-activities/list-activities.component';
// import { ToastyModule } from 'ng2-toasty';
import { ViewDetailsHotelComponent } from './pages/hotel/view-details-hotel/view-details-hotel.component';
import { FormHeaderComponent } from './pages/common/form-header/form-header.component';
import { ConfirmDialogComponent } from './pages/common/confirm-dialog/confirm-dialog.component';

import { ExtraBedComponent } from './pages/hotel/amenities-hotel/extra-bed/extra-bed.component';
import { ExtraBedService } from './pages/hotel/amenities-hotel/extra-bed/shared/extra-bed.service';
import { AmenitiesService } from './pages/hotel/amenities-hotel/shared/amenities.service';
import { MultipleSelectorComponent } from '@commons/multiple-selector/multiple-selector.component';
//import { StarRatingModule } from 'angular-star-rating';
import { ViewDetailsHotelService } from './pages/hotel/view-details-hotel/shared/view-details-hotel-service';
import { HotelImagesComponent } from './pages/hotel/view-details-hotel/hotel-images/hotel-images.component';
import { HotelPoliciesComponent } from './pages/hotel/view-details-hotel/hotel-policies/hotel-policies.component';
import { HotelRoomDetailsComponent } from './pages/hotel/view-details-hotel/hotel-room-details/hotel-room-details.component';
import { ViewDetailsTransferComponent } from './pages/transfer/view-details-transfer/view-details-transfer.component';
import { ListTransferService } from './pages/transfer/list-transfer/shared/list-transfer.service';
import { CheckInCheckOutComponent } from './pages/hotel/payment-policies-hotel/check-in-check-out/check-in-check-out.component';
import { ChildrenPolicyComponent } from './pages/hotel/payment-policies-hotel/children-policy/children-policy.component';
import { PetPolicyComponent } from './pages/hotel/payment-policies-hotel/pet-policy/pet-policy.component';
// tslint:disable-next-line:max-line-length
import { GuestPaymentOptionsService } from './pages/hotel/payment-policies-hotel/guest-payment-options/shared/guest-payment-options.service';
import { CancellationOptionsService } from './pages/hotel/payment-policies-hotel/cancellation-options/shared/cancellation-options.service';
import { CancellationFeesService } from './pages/hotel/payment-policies-hotel/cancellation-fees/shared/cancellation-fees.service';
import { CheckInCheckOutService } from './pages/hotel/payment-policies-hotel/check-in-check-out/shared/check-in-check-out.service';
import { GuestPaymentOptionsComponent } from './pages/hotel/payment-policies-hotel/guest-payment-options/guest-payment-options.component';
import { CancellationOptionsComponent } from './pages/hotel/payment-policies-hotel/cancellation-options/cancellation-options.component';
import { CancellationFeesComponent } from './pages/hotel/payment-policies-hotel/cancellation-fees/cancellation-fees.component';
import { PaymentPoliciesHotelService } from './pages/hotel/payment-policies-hotel/shared/payment-policies-hotel.service';
import { CheckInCheckOutValidator } from './pages/hotel/payment-policies-hotel/check-in-check-out/shared/check-in-check-out.validator';

import { BreakfastValidator } from './pages/hotel/general-description-hotel/breakfast/shared/breakfast.validator';

import { PetPolicyService } from './pages/hotel/payment-policies-hotel/pet-policy/shared/pet-policy.service';
import { NavigatorTransferComponent } from './pages/transfer/navigator-transfer/navigator-transfer.component';
import { BasicInformationTransferComponent } from './pages/transfer/basic-information-transfer/basic-information-transfer.component';
import { FeaturesTransferComponent } from './pages/transfer/features-transfer/features-transfer.component';
import { PoliciesTransferComponent } from './pages/transfer/policies-transfer/policies-transfer.component';
import { NameDetailsComponent } from './pages/transfer/basic-information-transfer/name-details/name-details.component';
import { AddressInfoComponent } from './pages/transfer/basic-information-transfer/address-info/address-info.component';
import { ContactPhonesComponent } from './pages/transfer/basic-information-transfer/contact-phones/contact-phones.component';
import { NavigatorActivitiesComponent } from './pages/activities/navigator-activities/navigator-activities.component';
import { NewActivityComponent } from './pages/activities/new-activity/new-activity.component';
// tslint:disable-next-line:max-line-length
import { BasicInformationActivitiesComponent } from './pages/activities/basic-information-activities/basic-information-activities.component';
import { PoliciesPaymentActivitiesComponent } from './pages/activities/policies-payment-activities/policies-payment-activities.component';
import { GeneralInfoComponent } from './pages/activities/basic-information-activities/general-info/general-info.component';
import { ContactInfoComponent } from '@commons/contact-info/contact-info.component';
import { PhoneComponent } from '@commons/phone/phone.component';
import { CountryService } from '@commons/phone/shared/country.service';
import { ActivityInfoComponent } from './pages/activities/new-activity/activity-info/activity-info.component';
import { FeaturesComponent } from './pages/activities/new-activity/features/features.component';
import { ItineraryComponent } from './pages/activities/new-activity/itinerary/itinerary.component';
import { GeneralDescriptionComponent } from './pages/activities/new-activity/general-description/general-description.component';
import { RatesActivitiesComponent } from './pages/activities/rates-activities/rates-activities.component';
import { TaxesSetupComponent } from '@commons/taxes-setup/taxes-setup.component';
import { PaymentMethodsComponent } from '@commons/payment-methods/payment-methods.component';
import { AgeRangeComponent } from './pages/activities/policies-payment-activities/age-range/age-range.component';
import { ListSubActivitiesComponent } from './pages/activities/new-activity/itinerary/list-sub-activities/list-sub-activities.component';
import { ListRatesComponent } from './pages/activities/rates-activities/list-rates/list-rates.component';
import { PhotoGalleryComponent } from '@commons/photo-gallery/photo-gallery.component';
import { ModalSavePhotosComponent } from '@commons/modal-save-photos/modal-save-photos.component';
import { PaymentMethodsService } from '@commons/payment-methods/shared/payment-methods.service';
import { RatesActivitiesService } from './pages/activities/rates-activities/shared/rates-activities.service';
import { VehicleInfoComponent } from './pages/transfer/features-transfer/vehicle-info/vehicle-info.component';
import { VehicleListComponent } from './pages/transfer/features-transfer/vehicle-list/vehicle-list.component';
import { LocationComponent } from './pages/hotel/basic-information-hotel/location/location.component';
import { PropertyComponent } from './pages/hotel/basic-information-hotel/property/property.component';
import { ContactdetailComponent } from './pages/hotel/basic-information-hotel/contactdetail/contactdetail.component';
import { ChannelmanagerComponent } from './pages/hotel/basic-information-hotel/channelmanager/channelmanager.component';
import { ListActivitiesService } from './pages/activities/list-activities/shared/list-activities.service';
import { DriversTransferComponent } from './pages/transfer/drivers-transfer/drivers-transfer.component';
import { ExtraChargesComponent } from './pages/transfer/policies-transfer/extra-charges/extra-charges.component';
import { WaitTimeComponent } from './pages/transfer/policies-transfer/wait-time/wait-time.component';
import { ExtraChargesService } from './pages/transfer/policies-transfer/extra-charges/shared/extra-charges.service';
import { WaitTimeService } from './pages/transfer/policies-transfer/wait-time/shared/wait-time.service';
import { RateSetupTransferComponent } from './pages/transfer/rate-setup-transfer/rate-setup-transfer.component';
import { RateSetupTransferService } from './pages/transfer/rate-setup-transfer/shared/rate-setup-transfer.service';
import { ExcludeTaxesComponent } from '@commons/exclude-taxes/exclude-taxes.component';
import { ExcludeTaxesService } from '@commons/exclude-taxes/shared/exclude-taxes.service';
import { ExtraChargesPricesComponent } from './pages/transfer/rate-setup-transfer/extra-charges-prices/extra-charges-prices.component';
import { SettingTransferComponent } from './pages/transfer/setting-transfer/setting-transfer.component';
import { ModalSavePhotosService } from '@commons/modal-save-photos/shared/modal-save-photos.service';
import { ActivityInfoService } from './pages/activities/new-activity/activity-info/shared/activity-info.service';
import { CookieService } from 'ngx-cookie-service';
import { ListDriversComponent } from './pages/transfer/drivers-transfer/list-drivers/list-drivers.component';
import { CommonLoadingModalComponent } from './pages/common/common-loading-modal/common-loading-modal.component';
import { MultipleSelectorAccordionComponent } from './pages/common/multiple-selector-accordion/multiple-selector-accordion.component';
import { DriversTransferService } from './pages/transfer/drivers-transfer/shared/drivers-transfer.service';
import { CheckboxPriceComponent } from './pages/hotel/general-description-hotel/breakfast/checkbox-price/checkbox-price.component';
import { LayoutListComponent } from './pages/hotel/layout/layout-list/layout-list.component';
import { SharedModule } from './pages/com.usblick.common/shared.module';
import { ViewDetailsTransferService } from './pages/transfer/view-details-transfer/shared/view-details-transfer-service';
import { NewActivityService } from './pages/activities/new-activity/shared/new-activity.service';
import { FeaturesService } from './pages/activities/new-activity/features/shared/features.service';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { TaxesSetupService } from '@commons/taxes-setup/shared/taxes-setup.service';
import { PoliciesPaymentService } from './pages/activities/policies-payment-activities/shared/policies-payment.service';
import { PoliciesTransferService } from './pages/transfer/policies-transfer/shared/policies-transfer.service';
import { ViewDetailsActivityComponent } from './pages/activities/view-details-activity/view-details-activity.component';
import { ViewActivityInfoComponent } from './pages/activities/view-details-activity/view-activity-info/view-activity-info.component';
import { ViewSubActivityInfoComponent } from './pages/activities/view-details-activity/view-sub-activity-info/view-sub-activity-info.component';
import { ViewDetailsActivityService } from './pages/activities/view-details-activity/shared/view-details-activity.service';
import { ViewGeneralInfoComponent } from './pages/activities/view-details-activity/view-general-info/view-general-info.component';
import { ListSettingComponent } from './pages/transfer/setting-transfer/list-setting/list-setting.component';
import { ViewDetailsVehiclesComponent } from './pages/transfer/view-details-transfer/view-details-vehicles/view-details-vehicles.component';
import { ViewDetailsServicesComponent } from './pages/transfer/view-details-transfer/view-details-services/view-details-services.component';
import { ViewDetailsRatesComponent } from './pages/transfer/view-details-transfer/view-details-rates/view-details-rates.component';
import { ListProductComponent } from './pages/transfer/view-details-transfer/view-details-vehicles/list-product/list-product.component';

//Angular Material
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
// import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
// import {MatIconModule} from '@angular/material/icon';
import {MatSortModule} from '@angular/material/sort';
// import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';


// Material Modules
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
// import { DragulaService, DragulaModule  } from 'ng2-dragula';

import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgxStarsModule } from 'ngx-stars';
import { NgxInputStarRatingModule } from 'ngx-input-star-rating';
import { GenericContactComponent } from './pages/hotel/basic-information-hotel/contactdetail/generic-contact/generic-contact.component';


/// info-property-hotel
import { InfoPropertyHotelComponent } from './pages/hotel/info-property-hotel/info-property-hotel.component';
import { InfoPropertyHotelService } from '@hotel/info-property-hotel/shared/info-property-hotel.service';
import { DescriptionComponent } from './pages/hotel/info-property-hotel/description/description.component';
import { HowToGetComponent } from './pages/hotel/info-property-hotel/how-to-get/how-to-get.component';
import { AmenitiesComponent } from './pages/hotel/info-property-hotel/amenities-hotel/amenities.component';

/// FontAwsome Icons
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

/// ng-select Module
import { NgSelectModule } from '@ng-select/ng-select';

/// Custom Accordion
// import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AccordionComponent } from './shared/accordion/accordion.component';
import { AccordionRadioComponent } from './shared/accordion-radio/accordion-radio.component';
import { AccordionGroupComponent } from './shared/accordion/accordion-group.component';
import { AccordionRadioGroupComponent } from './shared/accordion-radio/accordion-radio-group.component';
import { PhotoVideoHotelComponent } from './pages/hotel/photo-video-hotel/photo-video-hotel.component';
import { VideosHotelComponent } from './pages/hotel/photo-video-hotel/videos-hotel/videos-hotel.component';
import { PhotoHotelComponent } from './pages/hotel/photo-video-hotel/photos-hotel/photo-hotel.component';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { InfoProductHotelComponent } from './pages/hotel/info-product-hotel/info-product-hotel.component';
import { MainDataComponent } from './pages/hotel/info-product-hotel/main-data/main-data.component';
import { RequirementsComponent } from './pages/hotel/info-product-hotel/requirements/requirements.component';
import { InformationComponent } from './pages/hotel/info-product-hotel/information/information.component';
import { CheckInCheckOutInfoProductComponent } from './pages/hotel/info-product-hotel/check-in-check-out/check-in-check-out.component';
import { InfoProductPhotosComponent } from './pages/hotel/info-product-hotel/info-product-photos/info-product-photos.component';
import { InfoProductVideosComponent } from './pages/hotel/info-product-hotel/info-product-videos/info-product-videos.component';
import { DragDirective } from './pages/hotel/photo-video-hotel/shared/drag.directive';



@NgModule({
  declarations: [
    AppComponent,
    BasicInformationHotelComponent,
    HeaderComponent,
    FooterComponent,
    CustomValidator,
    BasicInformationValidator,
    GeneralDescriptionHotelComponent,
    BaseNavigatorComponent,
    NavigatorHotelComponent,
    InternetComponent,
    ParkingComponent,
    BreakfastComponent,
    LanguageComponent,
    LayoutComponent,
    RoomInfoComponent,
    RoomItemsComponent,
    BedInfoComponent,
    RoomPriceComponent,
    FacilitiesComponent,
    BaseListComponent,
    ListHotelComponent,
    DashboardComponent,
    AmenitiesHotelComponent,
    PhotosHotelComponent,
    PaymentPoliciesHotelComponent,
    ListTransferComponent,
    ListActivitiesComponent,
    ViewDetailsHotelComponent,
    FormHeaderComponent,
    ConfirmDialogComponent,
    ExtraBedComponent,
    MultipleSelectorComponent,
    HotelImagesComponent,
    HotelPoliciesComponent,
    HotelRoomDetailsComponent,
    ViewDetailsTransferComponent,
    GuestPaymentOptionsComponent,
    CancellationOptionsComponent,
    CancellationFeesComponent,
    CheckInCheckOutComponent,
    ChildrenPolicyComponent,
    PetPolicyComponent,
    CheckInCheckOutValidator,
    NavigatorTransferComponent,
    BasicInformationTransferComponent,
    FeaturesTransferComponent,
    PoliciesTransferComponent,
    NameDetailsComponent,
    AddressInfoComponent,
    ContactInfoComponent,
    BreakfastValidator,
    VehicleInfoComponent,
    VehicleListComponent,
    LocationComponent,
    PropertyComponent,
    ContactdetailComponent,
    ChannelmanagerComponent,
    NavigatorActivitiesComponent,
    NewActivityComponent,
    BasicInformationActivitiesComponent,
    PoliciesPaymentActivitiesComponent,
    GeneralInfoComponent,
    ContactPhonesComponent,
    PhoneComponent,
    ActivityInfoComponent,
    FeaturesComponent,
    ItineraryComponent,
    GeneralDescriptionComponent,
    RatesActivitiesComponent,
    TaxesSetupComponent,
    PaymentMethodsComponent,
    AgeRangeComponent,
    ListSubActivitiesComponent,
    ListRatesComponent,
    PhotoGalleryComponent,
    ModalSavePhotosComponent,
    DriversTransferComponent,
    ExtraChargesComponent,
    WaitTimeComponent,
    SettingTransferComponent,
    RateSetupTransferComponent,
    ExcludeTaxesComponent,
    ExtraChargesPricesComponent,
    ListDriversComponent,
    CommonLoadingModalComponent,
    MultipleSelectorAccordionComponent,
    CheckboxPriceComponent,
    LayoutListComponent,
    ViewDetailsActivityComponent,
    ViewActivityInfoComponent,
    ViewSubActivityInfoComponent,
    ViewGeneralInfoComponent,
    ListSettingComponent,
    ViewDetailsVehiclesComponent,
    ViewDetailsServicesComponent,
    ViewDetailsRatesComponent,
    ListProductComponent,
    GenericContactComponent,
    InfoPropertyHotelComponent,
    DescriptionComponent,
    HowToGetComponent,
    AmenitiesComponent,
    AccordionComponent,
    AccordionGroupComponent,
    AccordionRadioComponent,
    AccordionRadioGroupComponent,
    PhotoVideoHotelComponent,
    VideosHotelComponent,
    PhotoHotelComponent,
    InfoProductHotelComponent,
    MainDataComponent,
    RequirementsComponent,
    InformationComponent,
    CheckInCheckOutInfoProductComponent,
    InfoProductPhotosComponent,
    InfoProductVideosComponent,
    DragDirective
  ],
  entryComponents: [ConfirmDialogComponent, ModalSavePhotosComponent, CommonLoadingModalComponent],
  imports: [
    SharedModule,
    //ToastyModule.forRoot(),
    BsDropdownModule.forRoot(),
    //ToastModule.forRoot(),
    //AlertModule.forRoot(),
    NgbModule,
    //StarRatingModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatRadioModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    // DragulaModule.forRoot(),
    NguiAutoCompleteModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 600, passThruUnknownUrl: true }),
    MatFormFieldModule,
    MatSelectModule,
    NgxStarsModule,
    NgxInputStarRatingModule,
    FontAwesomeModule,
    NgSelectModule,
    NgxDropzoneModule
  ],
  providers: [HotelService, {provide: LocationStrategy, useClass: HashLocationStrategy}, InternetService,
    ParkingService, FacilitiesService, BreakfastService, LanguageService, GeneralDescriptionHotelService,
    RoomInfoService, BedInfoService, LayoutService, ListHotelService, ViewDetailsHotelService, ExtraBedService,
    AmenitiesService, ListTransferService, GuestPaymentOptionsService, CancellationOptionsService,
    CancellationFeesService, CheckInCheckOutService, PaymentPoliciesHotelService,
   ///  DragulaService, 
    PetPolicyService, CountryService, PaymentMethodsService, RatesActivitiesService, ListActivitiesService,
    ExtraChargesService, WaitTimeService, RateSetupTransferService, ExcludeTaxesService, ModalSavePhotosService,
    ActivityInfoService, CookieService, DriversTransferService,  ViewDetailsTransferService, NewActivityService,
    FeaturesService, TaxesSetupService, PoliciesPaymentService, PoliciesTransferService, ViewDetailsActivityService, 
    InfoPropertyHotelService],
  bootstrap: [AppComponent]
})
export class AppModule { }