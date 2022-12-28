import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailsPersonnelDialogComponent } from '../components/details-personnel-dialog/details-personnel-dialog.component';
import { DepartementService } from '../services/departement.service';
import { DirectionService } from '../services/direction.service';
import { PersonnelService } from '../services/personnel.service';
import { ServiceficService } from '../services/servicefic.service';

@Component({
  selector: 'app-recherche-avancee',
  templateUrl: './recherche-avancee.component.html',
  styleUrls: ['./recherche-avancee.component.scss']
})
export class RechercheAvanceeComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [7, 10, 15, 20];

  directions: any;
  departements: any;
  services: any;
  listPersonnel: any = [];
  startSearch: boolean = false;
  loading: boolean = false;

  selectedonePersonnelRech: any  = {
    PersonnelId: null, Matricule: null, Nom: null, Mobile: null, Email: null,
    Fax: null, Fonction: null, TelBureau: null, Batiment: null, NumPorte: null, Photo: null, ServiceId: null, DirectionId: null,
    DepartementId: null, NomPrenoms: null, LibelleDirection: null, LibelleDepartement: null, LibelleService: null, SiteId: null,
    Prenoms: null, Sexe: null
  }

  constructor( 
    public dialog: MatDialog,
    private directionService: DirectionService,
    private serviceficService: ServiceficService,
    private departementService: DepartementService,
    private personnelService: PersonnelService
  ) { }

  ngOnInit(): void {
    this.getAllDirections();
  }

  recherche(sexe?: string, serviceId?: string) {
    this.startSearch = true;
    this.loading = true;
    this.selectedonePersonnelRech.Sexe = sexe;
    this.selectedonePersonnelRech.ServiceId = serviceId;
    if (this.selectedonePersonnelRech) {
      this.personnelService.recherchepersonnelmulticritereavancee(JSON.stringify(this.selectedonePersonnelRech)).subscribe(
        personnels => {
          this.loading = false;
          this.listPersonnel = personnels;
        }
      );
    }
  }

  getAllDirections() {
    this.directionService.readDirection().subscribe(
      reponse => {
        this.directions = reponse
      }
    )
  }

  getDirectionDepartements(id: string, sexe?: string, serviceId?: string) {
    this.selectedonePersonnelRech.DirectionId = id;
    this.departementService.recherchedepartementpardirection(+id).subscribe(
      reponse => {
        this.departements = reponse;
      }
    )
    this.getDepartementServices('', sexe, serviceId);
  }

  getDepartementServices(id: string, sexe?: string, serviceId?: string) {
    this.selectedonePersonnelRech.DepartementId = id;
    this.serviceficService.readServiceparDepartement(+id).subscribe(
      reponse => {
        this.services = reponse;
      }
    )
    this.recherche(sexe, serviceId);
  }

  openDialog(personnel: any) {
    this.dialog.open(DetailsPersonnelDialogComponent, {
      width: '70%',
      data: {
        personnel: personnel
      }
    });
  }

  changeSize(value: string) {
    this.tableSize = +value;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.listPersonnel;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.listPersonnel;
  }

}
