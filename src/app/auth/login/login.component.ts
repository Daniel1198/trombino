import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signForm!: FormGroup;
  loading: boolean = false;

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
    private authService: AuthService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signForm = this.builder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  onSubmit() {
    this.loading = true;
    const formData = new FormData();

    formData.append('username', this.form['username']?.value);
    formData.append('password', this.form['password']?.value);

    this.authService.loginUser(formData)
      .subscribe(
        res => {
          this.loading = false;
          if (res.success) {
            this.route.navigate(['/admin']);
          }
          else {
            this.Toast.fire({
              icon: 'error',
              title: res.message
            })
          }
        }
      );
  }

  get form() 
  { 
      return this.signForm.controls; 
  }

}
