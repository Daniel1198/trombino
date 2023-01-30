import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signForm!: FormGroup;
  erreur: boolean = false;
  errMsg: string = '';
  loading: boolean = false;

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
          if (res.success) {
            this.loading = false;
            this.route.navigate(['/admin']);
          }
          else {
            this.loading = false;
            this.erreur = true;
            this.errMsg = res.message;
          }
        }
      );
  }

  get form() 
  { 
      return this.signForm.controls; 
  }

}
