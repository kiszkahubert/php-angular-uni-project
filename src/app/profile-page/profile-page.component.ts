import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../shared/navbar/navbar.component";

interface Order{
  item: string,
  sauce?: string,
  meat?: string,
  quantity: number,
  totalPrice: number,
  orderDate: string,
  deliveryDate: string
}

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit{
  Orders?: Order[];

  ngOnInit(): void {
    //TODO make call to API 
  }

}
