import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})

export class ServiceficService {
  url = this.urlgeneral.urlg;

  constructor(private httpClient: HttpClient,
              private urlgeneral: ConfigService) {}

  readService(): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/listeservice.php');
  }

  rechercheservicesmulticritere(id?: string): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/servicerecherchemulticritere.php?id=' + id);
  }

  updateService(service: any):  Observable<any>  {
    return this.httpClient.post<any>(this.url + '/api/update/service.php', service);
  }

  creatService(service: any): Observable<any> {
    return this.httpClient.post<any>(this.url + '/api/create/service.php', service);
  }

  readoneService(id: any): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/oneservice.php?id=' + id);
  }

  deleteService(id: number) {
    return this.httpClient.get<any>(this.url + '/api/delete/service.php?id=' + id);
  }

  readServiceparDepartement(id: number): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/listeservicepardepartement.php?id=' + id);
  }

  readServiceparDirection(id: number): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/listeservicepardepartement.php?id=' + id);
  }
}

