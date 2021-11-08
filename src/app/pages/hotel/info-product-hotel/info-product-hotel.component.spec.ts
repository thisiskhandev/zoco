import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProductHotelComponent } from './info-product-hotel.component';

describe('InfoProductHotelComponent', () => {
  let component: InfoProductHotelComponent;
  let fixture: ComponentFixture<InfoProductHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoProductHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoProductHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
