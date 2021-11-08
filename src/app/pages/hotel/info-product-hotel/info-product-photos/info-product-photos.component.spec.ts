import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProductPhotosComponent } from './info-product-photos.component';

describe('InfoProductPhotosComponent', () => {
  let component: InfoProductPhotosComponent;
  let fixture: ComponentFixture<InfoProductPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoProductPhotosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoProductPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
