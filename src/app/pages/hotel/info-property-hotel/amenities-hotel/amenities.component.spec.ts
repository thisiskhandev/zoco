import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenitiesHotelComponent } from './amenities-hotel.component';

describe('AmenitiesHotelComponent', () => {
  let component: AmenitiesHotelComponent;
  let fixture: ComponentFixture<AmenitiesHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmenitiesHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmenitiesHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
