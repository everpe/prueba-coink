import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {  }

  onSubmit(): void {
    if (this.form.valid) {
      //Temporalmente lo enviaré al dashboard sin verificar con Back, luego se debe consumir una Api con Auth real.
      this.router.navigate(['/admin/dashboard']);

      // const { email, password } = this.form.getRawValue();
      // this.auth.login(email, password)
      // .subscribe(() => {
      //   this.router.navigate(['/admin']);
      // });
    }
  }
}
