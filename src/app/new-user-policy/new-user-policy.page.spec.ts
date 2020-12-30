import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewUserPolicyPage } from './new-user-policy.page';

describe('NewUserPolicyPage', () => {
  let component: NewUserPolicyPage;
  let fixture: ComponentFixture<NewUserPolicyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserPolicyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewUserPolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
