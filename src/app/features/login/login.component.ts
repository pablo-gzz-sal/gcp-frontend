import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  showPassword: boolean = false;
  loading: boolean = false;
  errorMessage!: string | null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = null;

      this.authService
        .login(this.email?.value, this.password?.value)
        .subscribe({
          next: () => {
            console.log('Login successful!');
            this.loading = false;
            this.router.navigate(["/protected"]);
          },
          error: (err) => {
            this.errorMessage = 'Invalid email or password';
            this.loading = false;
          },
        });
    }
  }
}
