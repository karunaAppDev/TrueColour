import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginWithPhonePage } from './login-with-phone.page';

describe('LoginWithPhonePage', () => {
  let component: LoginWithPhonePage;
  let fixture: ComponentFixture<LoginWithPhonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginWithPhonePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginWithPhonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
