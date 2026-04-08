import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, Item } from '../inventory.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  
  templateUrl: './html/search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  
  searchTerm: string = '';
  results: Item[] = [];

  constructor(private inventoryService: InventoryService) {}

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.results = this.inventoryService.searchItems(this.searchTerm);
    } else {
      this.results = [];
    }
  }
}