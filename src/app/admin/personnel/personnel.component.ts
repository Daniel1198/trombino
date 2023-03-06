import { Component, OnInit } from '@angular/core';
import { PersonnelService } from 'src/app/services/personnel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [10, 15, 20];

  personnels: any = [];
  nbrEnr: number = 0;
  loading: boolean = false;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  constructor(
    private personnelService: PersonnelService
  ) { }

  ngOnInit(): void {
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.loading = true;
    this.personnelService.readPersonnel().subscribe(
      result => {
        this.loading = false;
        this.personnels = result;
        if (result !== null) {
          this.nbrEnr = result.length;
        }
      }
    )
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer cet agent ?',
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: `Non`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.loading = true;
        this.personnelService.deletePersonnel(id).subscribe(
          result => {
            this.loading = false;
            if (result.success) {
              this.Toast.fire({
                icon: 'success',
                title: result.message
              })
            }
            else {
              this.Toast.fire({
                icon: 'error',
                title: result.message
              })
            }
          }
        )
      }
    })
  }

  onSearch(search: string) {
    if (search.trim() != '') {
      this.loading = true;
      this.personnelService.recherchepersonnelmulticritere(search).subscribe(
        result => {
          this.loading = false;
          this.personnels = result;
          if (result !== null) {
            this.nbrEnr = result.length;
          }
          this.page = 1
        }
      )
    }
    else {
      this.getAllEmployee();
    }
  }

  changeSize(value: string) {
    this.tableSize = +value;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.personnels;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.personnels;
  }

}
