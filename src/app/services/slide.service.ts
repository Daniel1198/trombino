import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class SlideService {

  url = this.urlgeneral.urlg;

  constructor(
    private http: HttpClient,
    private urlgeneral: ConfigService
  ) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.url + '/api/read/slide.php');
  }

  delete(id: number): Observable<any> {
    return this.http.get<any>(this.url + '/api/delete/slide.php?id=' + id);
  }

  update(slide: any): Observable<any> {
    return this.http.post<any>(this.url + '/api/update/slide.php', slide);
  }

  new(slide: any): Observable<any> {
    return this.http.post<any>(this.url + '/api/create/slide.php', slide);
  }
}
