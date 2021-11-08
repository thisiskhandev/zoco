import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoVideoHotelComponent } from './photo-video-hotel.component';

describe('PhotoVideoHotelComponent', () => {
  let component: PhotoVideoHotelComponent;
  let fixture: ComponentFixture<PhotoVideoHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoVideoHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoVideoHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
