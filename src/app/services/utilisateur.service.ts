import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  url = this.configuration.urlg;

  constructor(private configuration: ConfigService,
              private httpClient: HttpClient) { }

  readUtilisateur(): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/listeutilisateur.php');
  }

  recherchenumeroutilemulticritere(id?: string): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/rechercheutilisateurmulticritere.php?id=' + id);
  }

  deleteUtilisateur(id: number) {
    return this.httpClient.get<any>(this.url + '/api/delete/utilisateur.php?id=' + id);
  }

  readoneUtilisateur(id: number): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/oneutilisateur.php?id=' + id);
  }

  creatUtilisateur(utilisateur: any): Observable<any> {
    return this.httpClient.post<any>(this.url + '/api/create/utilisateur.php', utilisateur);
  }

  updateUtilisateur(utilisateur: any):  Observable<any>  {
    return this.httpClient.post<any>(this.url + '/api/update/utilisateur.php', utilisateur);
  }

  verifiUtilisateur(id?: string): Observable<string> {
    return this.httpClient.get<string>(this.url + '/api/read/verifiutilisateur.php?id=' + id);
  }

  RecherchUtilisateur(id?: string): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/Rechercheutilisateurparlogin.php?id=' + id);
  }

}
