import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  username: string = '';
  password: string = '';
  emailExists: boolean = false;
  isPasswordIncorrect: boolean = false;

  onSubmit(){
    
  }
}
