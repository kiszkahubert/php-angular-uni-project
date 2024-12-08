import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { IntroductionContentComponent } from "../introduction-content/introduction-content.component";
import { ImageSliderComponent } from "../image-slider/image-slider.component";
import { MapLocationComponent } from "../map-location/map-location.component";
import { FooterComponent } from "../footer/footer.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main-combined',
  standalone: true,
  imports: [NavbarComponent, IntroductionContentComponent, ImageSliderComponent, MapLocationComponent, FooterComponent],
  templateUrl: './main-combined.component.html',
  styleUrl: './main-combined.component.css'
})
export class MainCombinedComponent {
  constructor(private titleService: Title){
    this.titleService.setTitle("Strona główna");
  }
}
