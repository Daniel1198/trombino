import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DepartementService } from 'src/app/services/departement.service';
import { DirectionService } from 'src/app/services/direction.service';
import { PersonnelService } from 'src/app/services/personnel.service';
import { ServiceficService } from 'src/app/services/servicefic.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajout-personnel',
  templateUrl: './ajout-personnel.component.html',
  styleUrls: ['./ajout-personnel.component.scss']
})
export class AjoutPersonnelComponent implements OnInit {

  formGroup!: FormGroup;
  services: any;
  departements: any;
  directions: any;
  service: string = '';
  id!: number;
  loading: boolean = false;
  previewImage: any = '';

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
    private departementService: DepartementService,
    private serviceficService: ServiceficService,
    private personnelService: PersonnelService,
    private builder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadEmployee();
    this.getAllDirection();
  }

  getAllDirection() {
    this.directionService.readDirection().subscribe(
      result => {
        this.directions = result;
      }
    );
  }

  getDirectionDepartements(id: string|number) {
    this.departementService.recherchedepartementpardirection(+id).subscribe(
      result => {
        this.departements = result;
      }
    );
  }

  getDepartementServices(id: string|number) {
    this.serviceficService.readServiceparDepartement(+id).subscribe(
      result => {
        this.services = result;
      }
    );
  }

  loadEmployee() {
    if (this.id !== 0) {
      this.personnelService.readonePersonnel(this.id).subscribe(
        result => {
          this.getDirectionDepartements(result.DirectionId);
          this.getDepartementServices(result.DepartementId);
          this.getServiceLibelle(result.ServiceId);
          this.previewImage = result.Photo;

          this.formGroup.patchValue({
            id: result.PersonnelId,
            direction: result.DirectionId,
            departement: result.DepartementId,
            service: result.ServiceId,
            matricule: result.Matricule,
            nom: result.Nom,
            prenom: result.Prenoms,
            sexe: result.Sexe,
            fonction: result.Fonction,
            mobile: result.Mobile,
            fax: result.Fax,
            email: result.Email,
            batiment: result.Batiment,
            porte: result.NumPorte,
            poste: result.TelBureau
          });
        }
      );
    }
  }

  initForm() {
    this.formGroup = this.builder.group({
      id: [''],
      direction: ['', Validators.required],
      departement: ['', Validators.required],
      service: ['', Validators.required],
      matricule: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      sexe: ['', Validators.required],
      fonction: ['', Validators.required],
      mobile: ['', Validators.required],
      fax: [''],
      email: ['', Validators.email],
      batiment: [''],
      porte: [''],
      poste: [''],
      photo: [],
    });
  }

  onSubmitForm() {

    const formData = new FormData();

    formData.append('PersonnelId', this.formGroup.get('id')?.value);
    formData.append('DirectionId', this.formGroup.get('direction')?.value);
    formData.append('DepartementId', this.formGroup.get('departement')?.value);
    formData.append('ServiceId', this.formGroup.get('service')?.value);
    formData.append('Matricule', this.formGroup.get('matricule')?.value);
    formData.append('Nom', this.formGroup.get('nom')?.value);
    formData.append('Prenoms', this.formGroup.get('prenom')?.value);
    formData.append('Sexe', this.formGroup.get('sexe')?.value);
    formData.append('Fonction', this.formGroup.get('fonction')?.value);
    formData.append('Mobile', this.formGroup.get('mobile')?.value);
    formData.append('Fax', this.formGroup.get('fax')?.value);
    formData.append('Email', this.formGroup.get('email')?.value);
    formData.append('Batiment', this.formGroup.get('batiment')?.value);
    formData.append('NumPorte', this.formGroup.get('porte')?.value);
    formData.append('TelBureau', this.formGroup.get('poste')?.value);
    formData.append('Photo', this.formGroup.get('photo')?.value);
    formData.append('NomPrenoms', this.formGroup.get('nom')?.value + ' ' + this.formGroup.get('prenom')?.value);

    if (this.id === 0) {
      this.loading = true;
      this.personnelService.creatPersonnel(formData).subscribe(
        result => {
          this.loading = false;
          if (result.success) {
            this.Toast.fire({
              icon: 'success',
              title: result.message
            })
            this.formGroup.reset();
          }
          else {
            this.Toast.fire({
              icon: 'error',
              title: result.message
            })
          }
        }
      );
    } else {

      Swal.fire({
        title: 'Voulez-vous vraiment enregistrer les modifications apportées ?',
        showDenyButton: true,
        confirmButtonText: 'Oui',
        denyButtonText: `Non`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.loading = true;
          this.personnelService.updatePersonnel(formData).subscribe(
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
          );
        }
      })
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (e) => this.previewImage = e.target?.result;
      reader.readAsDataURL(file);
      
      this.formGroup.patchValue({
        photo: file
      });
    }
  }

  getServiceLibelle(id: string) {
    this.serviceficService.readoneService(id).subscribe(
      result => {
        this.service = result.LibelleService;
      }
    );
  }

}
