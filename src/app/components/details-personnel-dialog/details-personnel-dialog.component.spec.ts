import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPersonnelDialogComponent } from './details-personnel-dialog.component';

describe('DetailsPersonnelDialogComponent', () => {
  let component: DetailsPersonnelDialogComponent;
  let fixture: ComponentFixture<DetailsPersonnelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsPersonnelDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsPersonnelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
