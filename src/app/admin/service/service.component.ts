import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartementService } from 'src/app/services/departement.service';
import { DirectionService } from 'src/app/services/direction.service';
import { ServiceficService } from 'src/app/services/servicefic.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  services: any = [];
  directions: any;
  departements: any;
  formGroup!: FormGroup;
  update: boolean = false;
  loading: boolean = false;
  loadingEdit: boolean = false;

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
    private serviceficService: ServiceficService,
    private departementService: DepartementService,
    private directionService: DirectionService,
    private builder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllServices();
    this.getAllDirection();
  }

  initForm() {
    this.formGroup = this.builder.group({
      id: [''],
      direction: ['', Validators.required],
      departement: ['', Validators.required],
      service: ['', Validators.required]
    });
  }

  onSubmitForm() {
    const formData = new FormData();

    formData.append('ServId', this.formGroup.get('id')?.value);
    formData.append('DirectionId', this.formGroup.get('direction')?.value);
    formData.append('DepartementId', this.formGroup.get('departement')?.value);
    formData.append('LibelleService', this.formGroup.get('service')?.value);

    if (!this.update) {
      this.loadingEdit = true;
      this.serviceficService.creatService(formData).subscribe(
        result => {
          this.loadingEdit = false;
          if (result.success) {
            this.Toast.fire({
              icon: 'success',
              title: result.message
            })
            this.formGroup.reset();
            this.getAllServices();
          }
          else {
            this.Toast.fire({
              icon: 'error',
              title: result.message
            })
          }
        }
      );
    }
    else {
      Swal.fire({
        title: 'Voulez-vous vraiment enregistrer les modifications apportées ?',
        showDenyButton: true,
        confirmButtonText: 'Oui',
        denyButtonText: `Non`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.loadingEdit = true;
          this.serviceficService.updateService(formData).subscribe(
            result => {
              this.loadingEdit = false;
              if (result.success) {
                this.Toast.fire({
                  icon: 'success',
                  title: result.message
                })
                this.getAllServices();
              }
              else {
                this.Toast.fire({
                  icon: 'error',
                  title: result.message
                })
              }
            }
          )
          this.onCancel();
        }
      })
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
    if (form.DirectionId != this.formGroup.get('direction')?.value) {
      this.getDirectionDepartements(form.DirectionId);
    }
    
    this.formGroup.patchValue({
      id: form.Id,
      service: form.LibelleService,
      direction: form.DirectionId,
      departement: form.DepartementId,
    });
  }

  onDelete(id: any) {  
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer ce service ?',
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: `Non`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingEdit = true;
        this.serviceficService.deleteService(id).subscribe(
          result => {
            this.loadingEdit = false;
            if (result.success) {
              this.Toast.fire({
                icon: 'success',
                title: result.message
              })
              this.getAllServices();
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

  getAllServices() {
    this.loading = true;
    this.serviceficService.readService().subscribe(
      result => {
        this.loading = false;
        this.services = result;
      }
    );
  }

  getDirectionDepartements(id: string) {
    this.departementService.recherchedepartementpardirection(+id).subscribe(
      result => {
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
    this.serviceficService.rechercheservicesmulticritere(search).subscribe(
      result => {
        this.loading = false;
        this.services = result;
        this.page = 1;
      }
    )
  }

  changeSize(value: string) {
    this.tableSize = +value;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.services;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.services;
  }

}
