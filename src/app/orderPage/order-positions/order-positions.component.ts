import { Component, OnInit, signal } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../services/MenuService';
import { NavbarComponent } from "../../shared/navbar/navbar.component";

interface MenuItem {
  name: string;
  description: string;
  price: number;
  type: 'kebab' | 'burger' | 'pizza' | 'salad';
  sauces?: string[];
  meats?: string[];
}

@Component({
  selector: 'app-order-positions',
  standalone: true,
  imports: [FilterPipe, FormsModule, CommonModule, NavbarComponent],
  templateUrl: './order-positions.component.html',
  styleUrl: './order-positions.component.css'
})
export class OrderPositionsComponent implements OnInit {
  menuItems = signal<MenuItem[]>([]);
  selectedItem = signal<MenuItem | null>(null);
  selectedSauce = signal<string | null>(null);
  selectedMeat = signal<string | null>(null);
  quantity = signal<number>(1);

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getMenuItems().subscribe(
      items => this.menuItems.set(items)
    );
  }

  openForm(item: MenuItem): void {
    this.selectedItem.set(item);
    this.selectedSauce.set(null);
    this.selectedMeat.set(null);
    this.quantity.set(1);
  }

  saveOrder(): void {
    if (!this.selectedItem() || (this.selectedItem()!.type === 'kebab' && (!this.selectedSauce() || !this.selectedMeat()))) {
      return;
    }

    const positionOrder = parseInt(localStorage.getItem('positionOrder') || '1');
    const order = {
      item: this.selectedItem()!.name,
      sauce: this.selectedSauce(),
      meat: this.selectedMeat(),
      quantity: this.quantity(),
      totalPrice: this.selectedItem()!.price * this.quantity()
    };

    localStorage.setItem(`order${positionOrder}`, JSON.stringify(order));
    localStorage.setItem('positionOrder', (positionOrder + 1).toString());

    this.closeForm();
  }

  closeForm(): void {
    this.selectedItem.set(null);
  }
}
