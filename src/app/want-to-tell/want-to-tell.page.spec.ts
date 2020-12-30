import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WantToTellPage } from './want-to-tell.page';

describe('WantToTellPage', () => {
  let component: WantToTellPage;
  let fixture: ComponentFixture<WantToTellPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WantToTellPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WantToTellPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
