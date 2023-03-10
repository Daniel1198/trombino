import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SiteComponent } from './site/site.component';
import { ServiceComponent } from './service/service.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { DepartementComponent } from './departement/departement.component';
import { DirectionComponent } from './direction/direction.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AjoutPersonnelComponent } from './ajout-personnel/ajout-personnel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlidesComponent } from './slides/slides.component';
import { PanelComponent } from './panel/panel.component';
import { LoaderModule } from '../loader/loader.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    SiteComponent,
    ServiceComponent,
    PersonnelComponent,
    UtilisateurComponent,
    DepartementComponent,
    DirectionComponent,
    AjoutPersonnelComponent,
    SlidesComponent,
    PanelComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxPaginationModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    LoaderModule,
    SweetAlert2Module
  ]
})
export class AdminModule { }
