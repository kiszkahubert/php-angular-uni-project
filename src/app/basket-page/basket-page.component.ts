import { Component, OnInit, signal } from '@angular/core';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

interface Order {
  item: string;
  sauce?: string;
  meat?: string;
  quantity: number;
  totalPrice: number;
}

@Component({
  selector: 'app-basket-page',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.css']
})
export class BasketPageComponent implements OnInit {
  orderKeys = signal<string[]>([]);
  orders = signal<Order[]>([]);

  constructor(private http: HttpClient, private titleService: Title){
    this.titleService.setTitle("Koszyk");
  }
  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      const orderKeys = Object.keys(localStorage).filter(key => key.startsWith('order'));
      this.orderKeys.set(orderKeys);
      
      const orders = orderKeys.map(key => {
        const orderData = localStorage.getItem(key);
        return orderData ? JSON.parse(orderData) : null;
      }).filter(order => order !== null) as Order[];
      
      this.orders.set(orders);
    }
  }

  removeOrder(index: number): void {
    const orderKey = this.orderKeys()[index];
    localStorage.removeItem(orderKey);
    this.orders.update(orders => orders.filter((_, i) => i !== index));
    this.orderKeys.update(orderKeys => orderKeys.filter((_, i) => i !== index));
  }

  saveOrders(): void {
    const userId = localStorage.getItem('userId');
    const orderData = this.orders().map(order => ({
      ...order,
      userkey: userId
    }));
    
    this.http.post<{ message: string }>('http://apache-php:8080/api/orders', orderData)
      .subscribe({
        next: (response) => {
          this.orderKeys().forEach(key => {
            localStorage.removeItem(key);
          });
          localStorage.removeItem('positionOrder');
          this.orders.set([]);
          this.orderKeys.set([]);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }
}
