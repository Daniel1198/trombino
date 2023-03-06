import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DirectionService } from 'src/app/services/direction.service';
import { SiteService } from 'src/app/services/site.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.scss']
})
export class DirectionComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  directions: any = [];
  sites: any;
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
    private directionService: DirectionService,
    private siteService: SiteService,
    private builder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllDirection();
    this.getAllSite();
  }

  getAllDirection() {
    this.loading = true;
    this.directionService.readDirection().subscribe(
      result => {
        this.loading = false;
        this.directions = result;
      }
    );
  }

  initForm() {
    this.formGroup = this.builder.group({
      id: [''],
      initiale: [''],
      direction: ['', Validators.required],
      site: ['', Validators.required]
    });
  }

  onSubmitForm() {
    const formData = new FormData();
    
    formData.append('Id_direction', this.formGroup.get('id')?.value)
    formData.append('Initial', this.formGroup.get('initiale')?.value)
    formData.append('LibelleDirection', this.formGroup.get('direction')?.value)
    formData.append('SiteId', this.formGroup.get('site')?.value)
        
    if (!this.update) {
      this.loadingEdit = true;
      this.directionService.creatDirection(formData).subscribe(
        result => {
          this.loadingEdit = false;
          if (result.success) {
            this.Toast.fire({
              icon: 'success',
              title: result.message
            })
            this.formGroup.reset();
            this.getAllDirection();
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
    else {
      Swal.fire({
        title: 'Voulez-vous vraiment enregistrer les modifications apportées ?',
        showDenyButton: true,
        confirmButtonText: 'Oui',
        denyButtonText: `Non`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.loadingEdit = true;
          this.directionService.updateDirection(formData).subscribe(
            result => {
              this.loadingEdit = false;
              if (result.success) {
                this.Toast.fire({
                  icon: 'success',
                  title: result.message
                })
                this.getAllDirection();
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
    this.directionService.readoneDirection(form.Id_direction).subscribe(
      result => {
        this.formGroup.patchValue({
          id: result.Id_direction,
          initiale: result.Initial,
          direction: result.LibelleDirection,
          site: result.SiteId,
        });
      }
    );
  }

  onDelete(id: number) {

    Swal.fire({
      title: 'Voulez-vous vraiment supprimer ce département ?',
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: `Non`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingEdit = true;
        this.directionService.deleteDirection(id).subscribe(
          result => {
            this.loadingEdit = false;
            if (result.success) {
              this.Toast.fire({
                icon: 'success',
                title: result.message
              })
              this.getAllDirection();
              this.page = 1;
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

  getAllSite() {
    this.siteService.readSite().subscribe(
      result => {
        this.sites = result;
      }
    );
  }

  onSearch(search: string) {
    this.loading = true;
    this.directionService.recherchedirectionsmulticritere(search).subscribe(
      result => {
        this.loading = false;
        this.directions = result;
        this.page = 1;
      }
    );
  }

  changeSize(value: string) {
    this.tableSize = +value;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.directions;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.directions;
  }

}
