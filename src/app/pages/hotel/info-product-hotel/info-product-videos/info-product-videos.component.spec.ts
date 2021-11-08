import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProductVideosComponent } from './info-product-videos.component';

describe('InfoProductVideosComponent', () => {
  let component: InfoProductVideosComponent;
  let fixture: ComponentFixture<InfoProductVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoProductVideosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoProductVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
