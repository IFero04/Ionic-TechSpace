import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoradaPage } from './morada.page';

describe('MoradaPage', () => {
  let component: MoradaPage;
  let fixture: ComponentFixture<MoradaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MoradaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
