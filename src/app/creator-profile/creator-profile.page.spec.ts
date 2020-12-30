import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatorProfilePage } from './creator-profile.page';

describe('CreatorProfilePage', () => {
  let component: CreatorProfilePage;
  let fixture: ComponentFixture<CreatorProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatorProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatorProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
