import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheRapideComponent } from './recherche-rapide.component';

describe('RechercheRapideComponent', () => {
  let component: RechercheRapideComponent;
  let fixture: ComponentFixture<RechercheRapideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechercheRapideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechercheRapideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
