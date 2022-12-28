import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedUserSubject!: BehaviorSubject<object>;
  public loggedInUser!: Observable<any>;

  baseUrl: string = this.config.urlg;
  getLoggedUser: any;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.getLoggedUser = JSON.parse(localStorage.getItem('loggedInUser')!);
    this.loggedUserSubject = new BehaviorSubject(this.getLoggedUser);
    this.loggedInUser = this.loggedUserSubject.asObservable();
  }

  loginUser(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/auth/login.php`, credentials)
        .pipe(map(response=> {
            localStorage.setItem('loggedInUser', JSON.stringify(response));
            this.loggedUserSubject.next(response);
            return response;
        }));
  }

  logoutUser() {
      localStorage.removeItem('loggedInUser');
      this.loggedUserSubject.next(null!);
  }

  public get loggedInUserValue(){
      return this.loggedUserSubject.value;
  }
}
