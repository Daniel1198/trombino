import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class NumeroutileService {
  url = this.configuration.urlg;

  constructor(private configuration: ConfigService,
              private httpClient: HttpClient) { }

  readNumeroutile(): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/listenumeroutile.php');
  }

  readoneNumeroutile(id?: string): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/onenumeroutile.php?id=' + id);
  }

  recherchenumeroutiles(id?: string): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/onenumeroutilerecherche.php?id=' + id);
  }


  recherchenumeroutilesparsite(id: number): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/numeroutileparsite.php?id=' + id);
  }

  creatNumeroutile(numeroutile: any): Observable<any> {
    return this.httpClient.post<any>(this.url + '/api/create/numeroutile.php', numeroutile);
  }

  updateNumeroutile(numeroutile: any): Observable<any>  {
    return this.httpClient.put<any>(this.url + '/api/update/numeroutile.php', numeroutile);
  }

  deleteNumeroutile(id: number) {
    return this.httpClient.delete<any>(this.url + '/api/delete/numeroutile.php?id=' + id);
  }

  recherchenumeroutilemulticritere(id?: string): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/recherchenumeroutilemulticritere.php?id=' + id);
  }

}
