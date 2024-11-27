import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginPageComponent } from "./auth/login-page/login-page.component";
import { RegisterPageComponent } from "./auth/register-page/register-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginPageComponent, RegisterPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'php-uni-project';
}
