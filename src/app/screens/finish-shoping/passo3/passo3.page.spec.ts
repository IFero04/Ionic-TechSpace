import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Passo3Page } from './passo3.page';

describe('Passo3Page', () => {
  let component: Passo3Page;
  let fixture: ComponentFixture<Passo3Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Passo3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
