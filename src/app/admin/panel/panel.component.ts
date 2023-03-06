import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  currentUser: any;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.loggedInUserValue;
  }

  onLogout() {
    Swal.fire({
      title: 'Vous allez être déconnecté ? Le confirmez-vous ?',
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: `Non`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logoutUser();
        location.reload();
      }
    })
  }

}
