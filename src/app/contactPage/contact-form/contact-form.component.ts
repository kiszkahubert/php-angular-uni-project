import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../../shared/navbar/navbar.component";

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
  title!: string;
  phoneNumber!: string;
  topic!: string;
  message!: string;

  onSubmit(){
    //HERE SHOULD BE IMPLEMENTED SENDING POST REQUEST TO ENDPOINT WHICH I DONT HAVE YET
  }
}
