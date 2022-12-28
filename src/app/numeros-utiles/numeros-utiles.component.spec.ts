import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumerosUtilesComponent } from './numeros-utiles.component';

describe('NumerosUtilesComponent', () => {
  let component: NumerosUtilesComponent;
  let fixture: ComponentFixture<NumerosUtilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumerosUtilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumerosUtilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
