import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PersonnelService } from 'src/app/services/personnel.service';

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
  search!: string;
  loading: boolean = false;
  
  constructor(
    private personnelService: PersonnelService,
    private toastr: ToastrService
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
    let confirmDeleting = confirm('Voulez-vous vraiment supprimer cet employé ?');

    if (confirmDeleting) {
      this.loading = true;
      this.personnelService.deletePersonnel(id).subscribe(
        result => {
          this.loading = false;
          if (result.success) {
            this.toastr.success(result.message);
            this.getAllEmployee();
          }
          else {
            this.toastr.error(result.message);
          }
        }
      )
    }
  }

  onSearch() {
    this.loading = true;
    this.personnelService.recherchepersonnelmulticritere(this.search).subscribe(
      result => {
        this.loading = false;
        this.personnels = result;
        if (result !== null) {
          this.nbrEnr = result.length;
        }
      }
    )
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
