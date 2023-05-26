import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Passo2Page } from './passo2.page';

describe('Passo2Page', () => {
  let component: Passo2Page;
  let fixture: ComponentFixture<Passo2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Passo2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
