import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import e from 'express';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, NavbarComponent],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  name!: string;
  email!: string;
  phoneNumber!: string;
  topic!: string;
  message!: string;

  constructor(private http: HttpClient){}

  onSubmit(){
    this.http.post<{ message: string }>('http://apache-php:8080/api/contact',{
      name: this.name,
      email: this.email,
      phone_number: this.phoneNumber,
      topic: this.topic,
      message: this.message
    })    
    .subscribe({
      next: (response) =>{
        this.name = '';
        this.email = '';
        this.phoneNumber = '';
        this.topic = '';
        this.message = '';
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
