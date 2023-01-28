import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DetailsPersonnelDialogComponent } from '../components/details-personnel-dialog/details-personnel-dialog.component';
import { PersonnelService } from '../services/personnel.service';
import { SlideService } from '../services/slide.service';

@Component({
  selector: 'app-recherche-rapide',
  templateUrl: './recherche-rapide.component.html',
  styleUrls: ['./recherche-rapide.component.scss']
})
export class RechercheRapideComponent implements OnInit {

  loading: boolean = false;
  personnels: any;
  nbrEnr: any;
  varAffich = 0;
  slides: any = [];
  search!: string;

  constructor(
    public dialog: MatDialog,
    private personnelService: PersonnelService,
    private slideService: SlideService
  ) { }

  ngOnInit(): void {
    this.getSlides();
  }

  getSlides() {
    this.slideService.getAll().subscribe(
      result => {
        this.slides = result;
      }
    );
  }

  onSearch(search: string) {
    if (!search) {
      this.varAffich = 0;
    } else {
      this.varAffich = 1;
      this.loading = true;
    }
    
    this.personnelService.recherchepersonnelmulticritere(search.trim()).pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(pers => {
        this.personnels = pers;
        if (pers !== null) {
          this.nbrEnr = pers.length;
        }
        this.loading = false;
      });
  }

  openDialog(personnel: any) {
    this.dialog.open(DetailsPersonnelDialogComponent, {
      width: '70%',
      data: {
        personnel: personnel
      }
    });
  }

}
