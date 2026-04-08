import { Component } from '@angular/core';
import { InventoryService, Item } from '../inventory.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [FormsModule, CommonModule],
  
  templateUrl: './html/inventory.component.html',
  
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {
  name = '';
  description = '';
  price: number | null = null;
  category = '';

  constructor(private inventoryService: InventoryService) {}

  onSubmit(): void {
    if (this.name && this.price !== null) {
      this.inventoryService.addItem({
        name: this.name,
        description: this.description,
        price: this.price,
        category: this.category
      });
      // 重置表单
      this.name = '';
      this.description = '';
      this.price = null;
      this.category = '';
    }
  }
}