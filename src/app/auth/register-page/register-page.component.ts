import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  username: string = '';
  password: string = '';
  hasError: boolean = false;

  constructor(private http: HttpClient, private router: Router, private titleService: Title){
    this.titleService.setTitle("Zarejestruj się!");
  }

  onSubmit(){
    const payload = {
      email: this.username,
      password: this.password
    }
    this.http.post<{ message: string }>('http://localhost:8080/api/register', payload)
      .subscribe({
        next: (response) =>{
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log(error)
          this.hasError = true;
        }
      })
  }
}
