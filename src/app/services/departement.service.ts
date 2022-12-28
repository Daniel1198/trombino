import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  url = this.urlgeneral.urlg;


  constructor(private httpClient: HttpClient,
              private urlgeneral: ConfigService) { }

  readDepartement(): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/listedepartement.php');
  }

  readoneDepartement(id: string): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/onedepartement.php?id=' + id);
  }

  readDirection(): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/listedirection.php');
  }

  updateDepartement(departement: any):  Observable<any>  {
    return this.httpClient.post<any>(this.url + '/api/update/departement.php', departement);
  }

  creatDepartement(departement: any): Observable<any> {
    return this.httpClient.post<any>(this.url + '/api/create/departement.php', departement);
  }

  deleteDepartement(id: number) {
    return this.httpClient.get<any>(this.url + '/api/delete/departement.php/?id=' + id);
  }

  recherchedirections(id?: string): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/onedirectionrecherche.php?id=' + id);
  }

  recherchedepartementsmulticritere(id?: string): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/departementrecherchemulticritere.php?id=' + id);
  }

  recherchedepartementpardirection(id?: number): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/listedepartementpardirection.php?id=' + id);
  }
}
