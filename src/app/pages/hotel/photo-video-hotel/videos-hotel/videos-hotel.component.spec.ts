import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosHotelComponent } from './videos-hotel.component';

describe('VideosHotelComponent', () => {
  let component: VideosHotelComponent;
  let fixture: ComponentFixture<VideosHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideosHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
