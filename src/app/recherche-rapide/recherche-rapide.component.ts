import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DetailsPersonnelDialogComponent } from '../components/details-personnel-dialog/details-personnel-dialog.component';
import { replaceAccent } from '../services/function';
import { PersonnelService } from '../services/personnel.service';
import { SlideService } from '../services/slide.service';

@Component({
  selector: 'app-recherche-rapide',
  templateUrl: './recherche-rapide.component.html',
  styleUrls: ['./recherche-rapide.component.scss']
})
export class RechercheRapideComponent implements OnInit {

  loading: boolean = false;
  personnels: any[] = [];
  data: any[] = [];
  nbrEnr: any;
  varAffich = 0;
  slides: any = [];
  search!: string;

  constructor(
    public dialog: MatDialog,
    private personnelService: PersonnelService,
    private slideService: SlideService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.getAllEmployees();
    this.getSlides();
    this.store.select((state: any) => state.root.search).subscribe(
      response => {
        this.search = response
        this.onSearch()
      }
    );
  }

  getAllEmployees() {
    this.personnelService.readPersonnel().subscribe(pers => {
        this.personnels = pers;
        console.log(pers);
        
        this.data = pers;
        if (pers !== null) {
          this.nbrEnr = pers.length;
        }
        this.loading = false;
      });
  }

  getSlides() {
    this.slideService.getAll().subscribe(
      result => {
        this.slides = result;
      }
    );
  }

  onSearch() {
    if (!this.search) {
      this.varAffich = 0;
    } else {
      this.varAffich = 1;
    }
    debounceTime(1000);
    this.personnels = this.data.filter((personnel: any) => {
      return replaceAccent(personnel.NomPrenoms).includes(replaceAccent(this.search)) ||
             replaceAccent(personnel.Email).includes(replaceAccent(this.search)) ||
             replaceAccent(personnel.TelBureau).includes(replaceAccent(this.search)) ||
             replaceAccent(personnel.Mobile).split(' ').join('').includes(replaceAccent(this.search))
    });
    this.nbrEnr = this.personnels.length;
    
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
