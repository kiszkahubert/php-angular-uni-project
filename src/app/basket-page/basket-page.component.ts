import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { HttpClient } from '@angular/common/http';

interface Order{
  item: string,
  sauce?: string,
  meat?: string,
  quantity: number,
  totalPrice: number
}

@Component({
  selector: 'app-basket-page',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './basket-page.component.html',
  styleUrl: './basket-page.component.css'
})
export class BasketPageComponent implements OnInit{
  orderKeys: string[] = [];
  orders: Order[] = [];
  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    if(typeof window !== 'undefined' && localStorage){
      this.orderKeys = Object.keys(localStorage).filter(key => key.startsWith('order'));
      this.orders = this.orderKeys.map(key => {
        const orderData = localStorage.getItem(key);
        return orderData ? JSON.parse(orderData) : null;
      }).filter(order => order !== null) as Order[];
    
      console.log(this.orders)
    }
  }

  removeOrder(index: number){
    localStorage.removeItem(this.orderKeys[index]);
    this.orders.splice(index, 1);
    this.orderKeys = this.orderKeys.filter((_, i) => i !== index)
  }

  saveOrders(){
    const userId = localStorage.getItem('userId');
    const orderData = this.orders.map(order => ({
      ...order,
      user_id: userId
    }))
    this.http.post<{ message: string}>('http://localhost:8080/api/orders',orderData)
      .subscribe({ 
        next: (response) =>{
          this.orders.forEach(element => {
            const key = element.item;
            localStorage.removeItem(key);
          });
          localStorage.removeItem('positionOrder');
        },
        error: (error) =>{
          console.log(error)
        }
      })
  }
}
