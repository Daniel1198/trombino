import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutPersonnelComponent } from './ajout-personnel/ajout-personnel.component';
import { DepartementComponent } from './departement/departement.component';
import { DirectionComponent } from './direction/direction.component';
import { PanelComponent } from './panel/panel.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { ServiceComponent } from './service/service.component';
import { SiteComponent } from './site/site.component';
import { SlidesComponent } from './slides/slides.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';

const routes: Routes = [
  { 
    path: '', component: PanelComponent, children: [
      { path: '', redirectTo: 'listepersonnel', pathMatch: 'full'},
      { path: 'site', component: SiteComponent },
      { path: 'service', component: ServiceComponent },
      { path: 'direction', component: DirectionComponent },
      { path: 'listepersonnel', component: PersonnelComponent },
      { path: 'personnel/edit/:id', component: AjoutPersonnelComponent },
      { path: 'utilisateur', component: UtilisateurComponent },
      { path: 'departement', component: DepartementComponent },
      { path: 'slides', component: SlidesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
