import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WantToKnowPage } from './want-to-know.page';

describe('WantToKnowPage', () => {
  let component: WantToKnowPage;
  let fixture: ComponentFixture<WantToKnowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WantToKnowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WantToKnowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
