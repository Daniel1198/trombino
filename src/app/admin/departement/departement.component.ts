import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartementService } from 'src/app/services/departement.service';
import { DirectionService } from 'src/app/services/direction.service';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  departements: any = [];
  directions: any;
  formGroup!: FormGroup;
  update: boolean = false;
  loading: boolean = false;
  loadingEdit: boolean = false;
  
  constructor(
    private directionService: DirectionService,
    private departementService: DepartementService,
    private builder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllDepartement();
    this.getAllDirection();
  }

  initForm() {
    this.formGroup = this.builder.group({
      id: [''],
      departement: ['', Validators.required],
      direction: ['', Validators.required]
    });
  }

  onSubmitForm() {
    this.loadingEdit = true;
    const formData = new FormData();

    formData.append('Id', this.formGroup.get('id')?.value);
    formData.append('LibelleDepartement', this.formGroup.get('departement')?.value);
    formData.append('DirectionId', this.formGroup.get('direction')?.value);

    if (!this.update) {
      this.departementService.creatDepartement(formData).subscribe(
        result => {
          this.loadingEdit = false;
          if (result.success) {
            this.toastr.success(result.message);
            this.formGroup.reset();
            this.getAllDepartement();
          }
          else {
            this.toastr.error(result.message);
          }
        }
      );
    }
    else {
      const confirmUpdating = confirm("Voulez-vous vraiment enregistrer les modifications apportées ?");
      if (confirmUpdating) {
        this.loadingEdit = true;
        this.departementService.updateDepartement(formData).subscribe(
          result => {
            this.loadingEdit = false;
            if (result.success) {
              this.toastr.success(result.message);
              this.getAllDepartement();
            }
            else {
              this.toastr.error(result.message);
            }
          }
        );
        this.onCancel();
      }
    }
  }

  onCancel() {
    this.update = false;
    this.formGroup.reset();
  }

  onUpdate(form: any) {
    if (!this.update) {
      this.update = true;
    }
    this.departementService.readoneDepartement(form.Id).subscribe(
      result => {
        this.formGroup.patchValue({
          id: result.Id,
          departement: result.LibelleDepartement,
          direction: result.DirectionId
        });
      }
    );
  }

  onDelete(id: number) {
    const confirmDeleting = confirm("Voulez-vous vraiment supprimer ce département ?");
    if (confirmDeleting) {
      this.loadingEdit = true;
      this.departementService.deleteDepartement(id).subscribe(
        result => {
          this.loadingEdit = false;
          if (result.success) {
            this.toastr.success(result.message);
            this.getAllDepartement();
          }
          else {
            this.toastr.error(result.message);
          }
        }
      );
    }
  }

  getAllDepartement() {
    this.loading = true;
    this.departementService.readDepartement().subscribe(
      result => {
        this.loading = false;
        this.departements = result;
      }
    );
  }

  getAllDirection() {
    this.directionService.readDirection().subscribe(
      result => {
        this.directions = result;
      }
    );
  }

  onSearch(search: string) {
    this.loading = true;
    this.departementService.recherchedepartementsmulticritere(search).subscribe(
      result => {
        this.loading = false;
        this.departements = result;
      }
    );
  }

  changeSize(value: string) {
    this.tableSize = +value;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.departements;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.departements;
  }

}
