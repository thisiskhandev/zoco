import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoHotelComponent } from './photo-hotel.component';

describe('PhotosHotelComponent', () => {
  let component: PhotoHotelComponent;
  let fixture: ComponentFixture<PhotoHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
