import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})

export class SiteService {
  url = this.configuration.urlg;

  constructor(private configuration: ConfigService,
    private httpClient: HttpClient) { }

  readSite(): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/listesite.php');
  }

  readoneSite(id?: string): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/onesite.php?id=' + id);
  }

  creatSite(site: any): Observable<any> {
    return this.httpClient.post<any>(this.url + '/api/create/site.php', site);
  }

  updateSite(site: any): Observable<any> {
    return this.httpClient.post<any>(this.url + '/api/update/site.php', site);
  }

  deleteSite(id: number) {
    return this.httpClient.get<any>(this.url + '/api/delete/site.php?id=' + id);
  }

  recherchesites(id?: string): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/onesiterecherche.php?id=' + id);
  }

}
