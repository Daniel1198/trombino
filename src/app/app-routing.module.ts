import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NumerosUtilesComponent } from './numeros-utiles/numeros-utiles.component';
import { PagePrincipaleComponent } from './page-principale/page-principale.component';
import { RechercheAvanceeComponent } from './recherche-avancee/recherche-avancee.component';
import { RechercheRapideComponent } from './recherche-rapide/recherche-rapide.component';

const routes: Routes = [
  { 
    path: '', component: PagePrincipaleComponent, children: [
      { path: '', redirectTo: 'rechercherapide', pathMatch: 'full' },
      { path: 'rechercherapide', component: RechercheRapideComponent },
      { path: 'rechercheavancee', component: RechercheAvanceeComponent },
      { path: 'numerosutiles', component: NumerosUtilesComponent },
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard] },
    ]
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
