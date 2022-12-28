import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { SiteService } from 'src/app/services/site.service';

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

  constructor(
    private builder: FormBuilder,
    private siteService: SiteService,
    private route: ActivatedRoute,
    private toastr: ToastrService
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
    this.loadingEdit = true;
    const siteFormData = new FormData();
    
    siteFormData.append('Id', this.formGroup.get('siteid')?.value)
    siteFormData.append('LibelleSite', this.formGroup.get('libellesite')?.value)
        
    if (!this.update) {
      this.siteService.creatSite(siteFormData).subscribe(
        result => {
          this.loadingEdit = false;
          if (result.success) {
            this.toastr.success(result.message);
            this.formGroup.reset();
            this.getAllSite();
          }
          else {
            this.toastr.error(result.message);
          }
        }
      )
    }
    else {
      const confirmUpdating = confirm("Voulez-vous enregistrer les modifications apportées ?");
      if (confirmUpdating) {
        this.loadingEdit = true;
        this.siteService.updateSite(siteFormData).subscribe(
          result => {
            this.loadingEdit = false;
            if (result.success) {
              this.toastr.success(result.message);
              this.getAllSite();
              this.onCancel();
            }
            else {
              this.toastr.error(result.message);
            }
          }
        )
      }
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
    const confirmDeleting = confirm("Voulez-vous vraiment supprimer ce site ?");
    if (confirmDeleting) {
      this.loadingEdit = true;
      this.siteService.deleteSite(id).subscribe(
        result => {
          this.loadingEdit = false;
          if (result.success) {
            this.toastr.success(result.message);
            this.formGroup.reset();
            this.getAllSite();
          }
          else {
            this.toastr.error(result.message);
          }
        }
      )
    }
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
