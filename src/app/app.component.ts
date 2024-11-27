import { Component } from '@angular/core';
import { MainCombinedComponent } from "./mainPage/main-combined/main-combined.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainCombinedComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'php-uni-project';
}
