import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RechercheRapideComponent } from './recherche-rapide/recherche-rapide.component';
import { PagePrincipaleComponent } from './page-principale/page-principale.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { RechercheAvanceeComponent } from './recherche-avancee/recherche-avancee.component';
import { NumerosUtilesComponent } from './numeros-utiles/numeros-utiles.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetailsPersonnelDialogComponent } from './components/details-personnel-dialog/details-personnel-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { LoaderModule } from './loader/loader.module';

const materialModule = [
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule,
  MatDialogModule,
  MatTableModule,
];

@NgModule({
  declarations: [
    AppComponent,
    PagePrincipaleComponent,
    RechercheAvanceeComponent,
    NumerosUtilesComponent,
    DetailsPersonnelDialogComponent,
    RechercheRapideComponent
  ],
  entryComponents: [DetailsPersonnelDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxPaginationModule,
    materialModule,
    HttpClientModule,
    FormsModule,
    LoaderModule
  ],
  providers: [
    { provide: DIALOG_DATA, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
