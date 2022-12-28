import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class DirectionService {
  url = this.urlgeneral.urlg;


  constructor(private httpClient: HttpClient,
    private urlgeneral: ConfigService) { }

  readDirection(): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/listedirection.php');
  }

  readoneDirection(id?: string): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/onedirection.php?id=' + id);
  }

  creatDirection(direction: any): Observable<any> {
    return this.httpClient.post<any>(this.url + '/api/create/direction.php', direction);
  }

  updateDirection(direction: any): Observable<any> {
    return this.httpClient.post<any>(this.url + '/api/update/direction.php', direction);
  }

  deleteDirection(id: number) {
    return this.httpClient.get<any>(this.url + '/api/delete/direction.php/?id=' + id);
  }

  recherchedirections(id?: string): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/onedirectionrecherche.php?id=' + id);
  }

  recherchedirectionsmulticritere(id?: string): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/directionrecherchemulticritere.php?id=' + id);
  }

  readoneDirectionSite(id?: string): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/onedirectionsite.php?id=' + id);
  }

}
