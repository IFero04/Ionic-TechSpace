import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GestaoMoradasModalComponent } from './gestao-moradas-modal.component';

describe('GestaoMoradasModalComponent', () => {
  let component: GestaoMoradasModalComponent;
  let fixture: ComponentFixture<GestaoMoradasModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GestaoMoradasModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GestaoMoradasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
