import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface MenuItem {
  name: string;
  description: string;
  price: number;
  type: 'kebab' | 'burger' | 'pizza' | 'salad';
  sauces?: string[];
  meats?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuItemsSubject = new BehaviorSubject<MenuItem[]>([
    { name: 'Pita', description: 'ok. 100g mięsa, kapusta, pomidor, ogórek, cebula, sosy', price: 20.00, type: 'kebab', sauces: ['Czosnkowy', 'Ostry', 'BBQ', 'Miodowo musztardowy', 'Brazylijski', 'Mieszany'], meats: ['Kurczak', 'Wołowo-baranie', 'Mieszane'] },
    { name: 'Pita XL', description: 'ok. 150g mięsa, kapusta, pomidor, ogórek, cebula, sosy', price: 25.00, type: 'kebab', sauces: ['Czosnkowy', 'Ostry', 'BBQ', 'Miodowo musztardowy', 'Brazylijski', 'Mieszany'], meats: ['Kurczak', 'Wołowo-baranie', 'Mieszane'] },
    { name: 'Pita XXL', description: 'ok. 200g mięsa, kapusta, pomidor, ogórek, cebula, sosy', price: 30.00, type: 'kebab', sauces: ['Czosnkowy', 'Ostry', 'BBQ', 'Miodowo musztardowy', 'Brazylijski', 'Mieszany'], meats: ['Kurczak', 'Wołowo-baranie', 'Mieszane'] },
    { name: 'Bułka', description: 'ok. 100g mięsa, marchewka, kapusta, pomidor, ogórek, cebula, sosy', price: 18.00, type: 'kebab', sauces: ['Czosnkowy', 'Ostry', 'BBQ', 'Miodowo musztardowy', 'Brazylijski', 'Mieszany'], meats: ['Kurczak', 'Wołowo-baranie', 'Mieszane'] },
    { name: 'Bułka XL', description: 'ok. 160g mięsa, marchewka, kapusta, pomidor, ogórek, cebula, sosy', price: 23.00, type: 'kebab', sauces: ['Czosnkowy', 'Ostry', 'BBQ', 'Miodowo musztardowy', 'Brazylijski', 'Mieszany'], meats: ['Kurczak', 'Wołowo-baranie', 'Mieszane'] },
    { name: 'Bułka XXL', description: 'ok. 210g mięsa, marchewka, kapusta, pomidor, ogórek, cebula, sosy', price: 29.00, type: 'kebab', sauces: ['Czosnkowy', 'Ostry', 'BBQ', 'Miodowo musztardowy', 'Brazylijski', 'Mieszany'], meats: ['Kurczak', 'Wołowo-baranie', 'Mieszane'] },
    { name: 'Lawasz', description: 'ok. 100g mięsa, marchewka, kapusta, pomidor, ogórek, cebula, sosy, lawasz ormiański', price: 22.00, type: 'kebab', sauces: ['Czosnkowy', 'Ostry', 'BBQ', 'Miodowo musztardowy', 'Brazylijski', 'Mieszany'], meats: ['Kurczak', 'Wołowo-baranie', 'Mieszane'] },
    { name: 'Lawasz XL', description: 'ok. 150g mięsa, marchewka, kapusta, pomidor, ogórek, cebula, sosy, lawasz ormiański', price: 27.00, type: 'kebab', sauces: ['Czosnkowy', 'Ostry', 'BBQ', 'Miodowo musztardowy', 'Brazylijski', 'Mieszany'], meats: ['Kurczak', 'Wołowo-baranie', 'Mieszane'] },
    { name: 'Lawasz XXL', description: 'ok. 200g mięsa, kapusta, pomidor, ogórek, sosy, lawasz ormiański', price: 32.00, type: 'kebab', sauces: ['Czosnkowy', 'Ostry', 'BBQ', 'Miodowo musztardowy', 'Brazylijski', 'Mieszany'], meats: ['Kurczak', 'Wołowo-baranie', 'Mieszane'] },
    { name: 'Burger', description: 'ok. 200g mięsa, sałata, pomidor, ogórek, cebula piklowana', price: 32.00, type: 'burger' },
    { name: 'Cheeseburger', description: 'ok. 200g mięsa, ser, sałata, pomidor, ogórek, cebula piklowana', price: 35.00, type: 'burger' },
    { name: 'Pulled pork burger', description: 'ok. 150g mięsa szarpanego, sałata, pomidor, ogórek, cebula piklowana', price: 40.00, type: 'burger' },
    { name: 'Pizza margherita', description: 'Mozarella, sos pomidorowy', price: 35.00, type: 'pizza' },
    { name: 'Pizza pepperoni', description: 'Mozarella, sos pomidorowy, pepperoni', price: 39.00, type: 'pizza' },
    { name: 'Pizza kurczak', description: 'Mozarella, sos pomidorowy, kurczak', price: 41.00, type: 'pizza' },
    { name: 'Pizza hawajska', description: 'Mozarella, sos pomidorowy, ananas', price: 32.00, type: 'pizza' },
    { name: 'Sałatka z ananasem', description: 'Makaron, kurczak, ananas, jabłko, seler', price: 20.00, type: 'salad' },
    { name: 'Sałatka grecka', description: 'Pomidor, ogórek, cebula czerwona, oliwki, ser feta', price: 31.00, type: 'salad' },
    { name: 'Sałatka caprese', description: 'Pomidory, mozarella, bazylia, oliwa', price: 23.00, type: 'salad' }
  ]);

  getMenuItems(): Observable<MenuItem[]> {
    return this.menuItemsSubject.asObservable();
  }

  getMenuItemsByType(type: MenuItem['type']): Observable<MenuItem[]> {
    return new BehaviorSubject(
      this.menuItemsSubject.value.filter(item => item.type === type)
    ).asObservable();
  }

  saveOrder(order: any): void {
    const positionOrder = parseInt(localStorage.getItem('positionOrder') || '1');
    localStorage.setItem(`order${positionOrder}`, JSON.stringify(order));
    localStorage.setItem('positionOrder', (positionOrder + 1).toString());
  }

  getOrders(): any[] {
    const orders = [];
    const positionOrder = parseInt(localStorage.getItem('positionOrder') || '1');
    for (let i = 1; i < positionOrder; i++) {
      const orderString = localStorage.getItem(`order${i}`);
      if (orderString) {
        orders.push(JSON.parse(orderString));
      }
    }
    return orders;
  }
}