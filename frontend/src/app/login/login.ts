import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html'
})
export class Login {
  email = '';
  pwd = '';

  constructor(private router: Router) {}

  validate() {
    console.log('Login:', this.email, this.pwd);
    this.router.navigate(['/chat']);
  }
}
