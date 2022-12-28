import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SlideService } from 'src/app/services/slide.service';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements OnInit {
  
  images: any = [];
  previewImages: any = [];
  updatedFile: any;

  constructor(
    private slideService: SlideService,
    private toastr: ToastrService
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
              this.toastr.success(result.message);
              this.getAllSlide();
            }
            else {
              this.toastr.error(result.message);
            }
          }
        );
      }
    }
    
  }

  onDelete(id: number) {
    const confirmDeleting = confirm('Voulez-vous vraiment supprimer ce slide ?');
    if (confirmDeleting) {
      this.slideService.delete(id).subscribe(
        result => {
          if (result.success) {
            this.toastr.success(result.message);
            this.getAllSlide();
          }
          else {
            this.toastr.error(result.message);
          }
        }
      );
    }
  }

  onUpdate(id: string, index: number) {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('lien', this.updatedFile);

    const confirmUpdating = confirm("Enregistrer la modification ?");
    if (confirmUpdating) {
      this.slideService.update(formData).subscribe(
        result => {
          if (result.success) {
            this.toastr.success(result.message);
            this.getAllSlide();
            this.previewImages[index] = '';
          }
          else {
            this.toastr.error(result.message);
          }
        }
      );
    }
  }

}
