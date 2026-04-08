import { Component } from '@angular/core';

@Component({
  selector: 'app-help',
  template: `
    <h2>Help & Usage Guide</h2>
    <div class="help-content">
      <h3>📦 Manage Inventory Page</h3>
      <p>Use this page to add new items to your inventory:</p>
      <ul>
        <li>Enter a unique Item ID</li>
        <li>Enter the item name</li>
        <li>Enter the quantity in stock</li>
        <li>Click "Add Item" to save it to your inventory</li>
      </ul>

      <h3>🔍 Search Page</h3>
      <p>Use this page to quickly find items in your inventory:</p>
      <ul>
        <li>Type an item name in the search box</li>
        <li>Results will filter automatically as you type</li>
      </ul>

      <h3>🔒 Privacy & Security</h3>
      <p>All your inventory data is stored locally in your browser.</p>
      <p>No data is sent to any external server, and your information is completely private.</p>
    </div>
  `,
  styles: [`
    .help-content { max-width: 800px; line-height: 1.6; }
    ul { margin: 10px 0 20px 20px; }
    h3 { margin-top: 20px; color: #2c3e50; }
  `]
})
export class HelpComponent { }