import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import Swal from 'sweetalert2';

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
    private utilisateurService: UtilisateurService
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
          this.loading = false;
          if (result.success) {
            this.Toast.fire({
              icon: 'success',
              title: result.message
            })
            this.getUsers();
            this.onCancel();
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
          this.utilisateurService.updateUtilisateur(formData).subscribe(
            result => {
              this.loadingEdit = false;
              if (result.success) {
                this.Toast.fire({
                  icon: 'success',
                  title: result.message
                })
                this.getUsers();
                this.onCancel();
              }
              else {
                this.Toast.fire({
                  icon: 'error',
                  title: result.message
                })
              }
            }
          );
          this.onCancel();
        }
      })
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
