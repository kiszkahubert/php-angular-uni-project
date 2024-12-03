import { Component } from '@angular/core';
import { MainCombinedComponent } from "./mainPage/main-combined/main-combined.component";
import { OrderPositionsComponent } from "./orderPage/order-positions/order-positions.component";
import { ContactFormComponent } from "./contactPage/contact-form/contact-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainCombinedComponent, OrderPositionsComponent, ContactFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'php-uni-project';
}
