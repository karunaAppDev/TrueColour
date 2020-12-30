import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserdetailsPage } from './userdetails.page';

describe('UserdetailsPage', () => {
  let component: UserdetailsPage;
  let fixture: ComponentFixture<UserdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
