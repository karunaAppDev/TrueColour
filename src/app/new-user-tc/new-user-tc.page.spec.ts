import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewUserTCPage } from './new-user-tc.page';

describe('NewUserTCPage', () => {
  let component: NewUserTCPage;
  let fixture: ComponentFixture<NewUserTCPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserTCPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewUserTCPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
