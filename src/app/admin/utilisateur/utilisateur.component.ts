import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  disableButton: boolean = false;
  formGroup!: FormGroup;
  utilisateurs: any = [];
  update: boolean = false;
  loading: boolean = false;
  loadingEdit: boolean = false;

  constructor(
    private builder: FormBuilder,
    private utilisateurService: UtilisateurService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.DesactivateField();
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.utilisateurService.readUtilisateur().subscribe(
      result => {
        this.loading = false;
        this.utilisateurs = result;
      }
    );
  }

  ActivateField() {
    this.disableButton = true;
    this.formGroup.get('email')?.enable()
    this.formGroup.get('login')?.enable()
    this.formGroup.get('mdp')?.enable()
    this.formGroup.get('isAdmin')?.enable()
  }

  DesactivateField() {
    this.disableButton = false;
    this.formGroup.get('email')?.disable()
    this.formGroup.get('login')?.disable()
    this.formGroup.get('mdp')?.disable()
    this.formGroup.get('isAdmin')?.disable()
  }

  initForm() {
    this.formGroup = this.builder.group({
      id: [''],
      email: ['', [Validators.required, Validators.email]],
      login: ['', Validators.required],
      mdp: [''],
      isAdmin: [],
    })
  }

  onCancel() {
    this.DesactivateField();
    this.update = false;
    this.formGroup.reset();
  }

  onUpdate(form: any) {
    this.ActivateField();

    if (!this.update) {
      this.update = true;
    }
    
    this.formGroup.patchValue({
      id: form.UtilisateurId,
      email: form.Email,
      login: form.Login,
      isAdmin: form.Administrateur == 0 ? false : true
    });
  }

  onSubmitForm() {
    const formData = new FormData();

    formData.append('UtilisateurId', this.formGroup.get('id')?.value);
    formData.append('Email', this.formGroup.get('email')?.value);
    formData.append('Login', this.formGroup.get('login')?.value);
    formData.append('Mdp', this.formGroup.get('mdp')?.value);
    formData.append('Administrateur', this.formGroup.get('isAdmin')?.value);

    if (!this.update) {
      this.loadingEdit = true;
      this.utilisateurService.creatUtilisateur(formData).subscribe(
        result => {
          if (result.success) {
            this.loading = false;
            this.toastr.success(result.message);
            this.getUsers();
            this.onCancel();
          }
          else {
            this.loading = false;
            this.toastr.error(result.message);
          }
        }
      );
    }

    else {
      const confirmUpdating = confirm("Voulez-vous enregistrer les modifications apportées ?");

      if (confirmUpdating) {
        this.loadingEdit = true;
        this.utilisateurService.updateUtilisateur(formData).subscribe(
          result => {
            if (result.success) {
              this.loadingEdit = false;
              this.toastr.success(result.message);
              this.getUsers();
              this.onCancel();
            }
            else {
              this.loading = false;
              this.toastr.error(result.message);
            }
          }
        );
      }
    }
  }

  changeSize(value: string) {
    this.tableSize = +value;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.utilisateurs;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.utilisateurs;
  }

}
