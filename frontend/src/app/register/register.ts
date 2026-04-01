import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, NgIf],
  templateUrl: './register.html'
})
export class Register {
  user = {
    username: '',
    email: '',
    dob: '',
    password: '',
    confirmPassword: ''
  };

  onSubmit() {
    console.log('Registered:', this.user);
  }
}
