import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Passo5Page } from './passo5.page';

describe('Passo5Page', () => {
  let component: Passo5Page;
  let fixture: ComponentFixture<Passo5Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Passo5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
