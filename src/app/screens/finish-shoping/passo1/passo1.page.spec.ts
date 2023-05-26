import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Passo1Page } from './passo1.page';

describe('Passo1Page', () => {
  let component: Passo1Page;
  let fixture: ComponentFixture<Passo1Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Passo1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
