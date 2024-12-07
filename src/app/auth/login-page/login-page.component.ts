import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;
  constructor(private http: HttpClient, private router: Router){}

  onSubmit(): void{
    const payload = {
      email: this.username,
      password: this.password
    }
    this.http.post<{ message: string, userId: string }>('http://localhost:8080/api/login', payload)
      .subscribe({
        next: (response) =>{
          localStorage.setItem('authToken',response.message);
          localStorage.setItem('userId',response.userId.toString());
          this.router.navigate(['/profile']);
        },
        error: (error) => {
          console.log(error)
          this.loginError = true;
        }
      })
  }
}
