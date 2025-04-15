import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule,CommonModule],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  

  // onSubmit() {
  //   if (this.registerForm.valid) {
  //     console.log(this.registerForm)
  //     this.authService.register(this.registerForm.value).subscribe({
  //       next: () => this.router.navigate(['/login']),
  //       error: err => this.errorMsg = 'Registration failed!'
  //     });
  //   }
  // }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Submitting:', this.registerForm.value);
  
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          console.log('Success:', res);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error:', err);
          this.errorMsg = 'Registration failed!';
        }
      });
    }
  }
  
}
