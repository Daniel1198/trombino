import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  url = this.urlgeneral.urlg;


  constructor(private httpClient: HttpClient,
    private urlgeneral: ConfigService) { }

  readPersonnel(): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/listepersonnel.php');
  }

  readonePersonnel(id: any): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/onepersonnel.php?id=' + id);
  }

  updatePersonnel(personnel: any): Observable<any> {
    return this.httpClient.post<any>(this.url + '/api/update/personnel.php', personnel);
  }

  creatPersonnel(personnel:any ): Observable<any> {
    return this.httpClient.post<any>(this.url + '/api/create/personnel.php', personnel);
  }

  recherchepersonnelmulticritere(id: string): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/personnelrecherchemulticritere.php?id=' + id);
  }

  recherchepersonnelmulticritereavancee(personnel?: string): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/read/personnelrecherchemulticriterefront.php?id=' + personnel);
  }

  deletePersonnel(id: number) {
    return this.httpClient.get<any>(this.url + '/api/delete/personnel.php?id=' + id);
  }

  vueTotalemploye(): Observable<number> {
    return this.httpClient.get<number>(this.url + '/api/vue/totalemploye.php');
  }

  vueTotalhomme(): Observable<number> {
    return this.httpClient.get<number>(this.url + '/api/vue/totalhomme.php');
  }

  vueTotalfemme(): Observable<number> {
    return this.httpClient.get<number>(this.url + '/api/vue/totalfemme.php');
  }

  vueTotalpardir(): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/vue/totalpardir.php');
  }

  msjphoto(): Observable<any> {
    return this.httpClient.get<any>(this.url + '/api/update/personnelconv.php');
  }

}
