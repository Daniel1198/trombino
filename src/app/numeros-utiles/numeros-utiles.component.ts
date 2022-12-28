import { Component, OnInit } from '@angular/core';
import { NumeroutileService } from '../services/numeroutile.service';
import { SiteService } from '../services/site.service';

@Component({
  selector: 'app-numeros-utiles',
  templateUrl: './numeros-utiles.component.html',
  styleUrls: ['./numeros-utiles.component.scss']
})
export class NumerosUtilesComponent implements OnInit {

  sites: any = [];
  numerosUtiles: any = [];
  loading: boolean = false;
  loadingNum: boolean = false;

  constructor(
    private siteService: SiteService,
    private numeroutileService: NumeroutileService
  ) { }

  ngOnInit(): void {
    this.getAllSite();
  }

  getAllSite() {
    this.loading = true;
    this.siteService.readSite().subscribe(
      result => {
        this.loading = false;
        this.sites = result;
      }
    )
  }

  // retourne les numeros par site puis les ranges par groupe

  getNumBySite(id: string) {
      this.loadingNum = true;
      this.numerosUtiles = [];
      this.numeroutileService.recherchenumeroutilesparsite(+id).subscribe(
        result => {
          let rangeBy = Math.ceil(result.length / 3);
          let initial = 0;
          let lastValueIterator = 0;


          if (result.length > 1) {
            // rangement par groupe dans 3 tableaux
            for (let i = 0; i < 3; i++) {
              this.numerosUtiles[i] = [];
              if (i != 2){
                rangeBy *= i+1;
              }
              else {
                rangeBy = result.length;
              }
              for (let j = initial; j < rangeBy; j++) {
                this.numerosUtiles[i].push(result[j]);
                lastValueIterator = j;
              }
              initial = lastValueIterator + 1;

              // suppression des tableaux n'ayant aucune valeur
              if (this.numerosUtiles[i].length == 0) {
                this.numerosUtiles.splice(this.numerosUtiles.indexOf(this.numerosUtiles[i]), 1); 
              }
            }
          }

          else if (result.length == 1) {
            this.numerosUtiles = result;
          }

          this.loadingNum = false;
        }
      )
  }

}
