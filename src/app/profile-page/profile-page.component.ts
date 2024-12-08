import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

interface Order{
  item: string,
  sauce?: string,
  meat?: string,
  quantity: number,
  totalprice: number,
  orderdate: string,
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
  constructor(private http: HttpClient, private titleService: Title){
    this.titleService.setTitle("Twój profil");
  }

  ngOnInit(): void {
    if(typeof window !== 'undefined'){
      const userId = localStorage.getItem('userId');
      if(userId){
        const params = new HttpParams().set('userkey', userId);
        this.http.get<{ orders: Order[] }>('http://apache-php:8080/api/orders', { params })
          .subscribe({
            next: (response) => {
              this.Orders = response.orders.map(order => ({
                ...order
              }));
            },
            error: (error) => {
              console.log(error)
            }
          });
      }
    }
  }
}
