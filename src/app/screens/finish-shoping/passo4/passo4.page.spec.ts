import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Passo4Page } from './passo4.page';

describe('Passo4Page', () => {
  let component: Passo4Page;
  let fixture: ComponentFixture<Passo4Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Passo4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
