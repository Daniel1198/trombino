import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SiteService } from 'src/app/services/site.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  formGroup!: FormGroup;
  sites: any = [];
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
    private builder: FormBuilder,
    private siteService: SiteService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllSite();
  }

  initForm() {
    this.formGroup = this.builder.group({
      siteid: [''],
      libellesite: ['', Validators.required]
    });
  }

  onSubmitForm() {
    const siteFormData = new FormData();
    
    siteFormData.append('Id', this.formGroup.get('siteid')?.value)
    siteFormData.append('LibelleSite', this.formGroup.get('libellesite')?.value)
        
    if (!this.update) {
      this.loadingEdit = true;
      this.siteService.creatSite(siteFormData).subscribe(
        result => {
          this.loadingEdit = false;
          if (result.success) {
            this.Toast.fire({
              icon: 'success',
              title: result.message
            })
            this.formGroup.reset();
            this.getAllSite();
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
        title: 'Voulez-vous enregistrer les modifications apportées ?',
        showDenyButton: true,
        confirmButtonText: 'Oui',
        denyButtonText: `Non`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.loadingEdit = true;
          this.siteService.updateSite(siteFormData).subscribe(
            result => {
              this.loadingEdit = false;
              if (result.success) {
                this.Toast.fire({
                  icon: 'success',
                  title: result.message
                })
                this.getAllSite();
                this.onCancel();
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

  onSearch(search: string) {
    this.loading = true;
    this.siteService.recherchesites(search).subscribe(
      result => {
        this.loading = false;
        this.sites = result;
        this.page = 1;
      }
    );
  }

  onCancel() {
    this.update = false;
    this.formGroup.reset();
  }

  onUpdate(form: any) {
    if (!this.update) {
      this.update = true;
    }
    this.siteService.readoneSite(form.Id).subscribe(
      result => {
        this.formGroup.patchValue({
          siteid: result.Id,
          libellesite: result.LibelleSite
        });
      }
    );
  }

  onDelete(id: number) {

    Swal.fire({
      title: 'Voulez-vous vraiment supprimer ce site ?',
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: `Non`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.loadingEdit = true;
        this.siteService.deleteSite(id).subscribe(
          result => {
            this.loadingEdit = false;
            if (result.success) {
              this.Toast.fire({
                icon: 'success',
                title: result.message
              })
              this.formGroup.reset();
              this.getAllSite();
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
    this.loading = true;
    this.siteService.readSite().subscribe(
      result => {
        this.loading = false;
        this.sites = result;
      }
    )
  }

  changeSize(value: string) {
    this.tableSize = +value;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.sites;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.sites;
  }

}
