import { Injectable } from '@angular/core';

export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private items: Item[] = [];
  private readonly STORAGE_KEY = 'inventory_items';

  constructor() {
    this.loadItems();
  }

  getItems(): Item[] {
    return this.items;
  }

  addItem(item: Omit<Item, 'id'>): void {
    const newItem: Item = {
      ...item,
      id: Date.now()
    };
    this.items.push(newItem);
    this.saveItems();
  }

  searchItems(query: string): Item[] {
    if (!query) return this.items;
    const lowerQuery = query.toLowerCase();
    return this.items.filter(item =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery)
    );
  }

  private saveItems(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
  }

  private loadItems(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.items = JSON.parse(data);
    }
  }
}