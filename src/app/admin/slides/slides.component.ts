import { Component, OnInit } from '@angular/core';
import { SlideService } from 'src/app/services/slide.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements OnInit {
  
  images: any = [];
  previewImages: any = [];
  updatedFile: any;

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
    private slideService: SlideService
  ) { }

  ngOnInit(): void {
    this.getAllSlide();
  }

  getAllSlide() {
    this.slideService.getAll().subscribe(
      result => {
        this.images = result;
        for (let i = 0; i < result.length; i++) {
          this.previewImages[i] = ''; 
        }
      }
    );
  }

  onFileChange(event: any, index: number, isNew:boolean) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();

      if (!isNew) {
        this.updatedFile = file;
        var reader = new FileReader();
        reader.onload = (e) => this.previewImages[index] = e.target?.result;
        reader.readAsDataURL(file);
      }
      else {
        formData.append('id', '');
        formData.append('lien', file);

        this.slideService.new(formData).subscribe(
          result => {
            if (result.success) {
              this.Toast.fire({
                icon: 'success',
                title: result.message
              })
              this.getAllSlide();
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
    }
    
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer cette image ?',
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: `Non`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.slideService.delete(id).subscribe(
          result => {
            if (result.success) {
              this.Toast.fire({
                icon: 'success',
                title: result.message
              })
              this.getAllSlide();
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

  onUpdate(id: string, index: number) {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('lien', this.updatedFile);

    Swal.fire({
      title: 'Voulez-vous vraiment enregistrer la modification apportée ?',
      showDenyButton: true,
      confirmButtonText: 'Oui',
      denyButtonText: `Non`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.slideService.update(formData).subscribe(
          result => {
            if (result.success) {
              this.Toast.fire({
                icon: 'success',
                title: result.message
              })
              this.getAllSlide();
              this.previewImages[index] = '';
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
