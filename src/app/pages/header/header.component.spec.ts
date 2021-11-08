import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';
import { UserData } from '../com.usblick.common/userProvider';
//import { ToastyService } from 'ng2-toasty';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../com.usblick.common/auth/auth.service';
import { AbstractMockServiceProvider } from '@shared/abstract-mock-service-provider';

class MockService extends AbstractMockServiceProvider {

  constructor() {
    super();
  }

  getCookie() {
    return null;
  }
}



describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    let mockService = new MockService();
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule,
        NgbModule.forRoot(),
        TranslateModule.forRoot()
      ],
      declarations: [HeaderComponent],
      providers: [
        { provide: UserData, useValue: mockService },
        { provide: AuthService, useValue: mockService },
        { provide: ToastyService, useValue: mockService }
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
