import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-page-principale',
  templateUrl: './page-principale.component.html',
  styleUrls: ['./page-principale.component.scss']
})
export class PagePrincipaleComponent implements OnInit {

  opened:boolean = true;
  connected: any;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.connected = this.authService.loggedInUserValue 
  }

  onSignOut() {
    const confirmSignout = confirm("Vous allez être déconnecté.");

    if (confirmSignout) {
      this.authService.logoutUser();
      location.reload();
    }
  }

}
