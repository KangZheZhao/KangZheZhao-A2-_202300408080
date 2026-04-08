import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="home-container">
      <h2>🏠 Welcome to Inventory Management System</h2>
      <p>This system helps you track and manage your inventory items easily.</p>
      <div class="features">
        <h3>Key Features:</h3>
        <ul>
          <li>Add, view, and manage inventory items</li>
          <li>Quickly search for items by name</li>
          <li>100% local storage, no data shared</li>
          <li>Simple and intuitive interface</li>
        </ul>
      </div>
      <p>Use the navigation bar above to get started!</p>
    </div>
  `,
  styles: [`
    .home-container { max-width: 800px; line-height: 1.6; }
    .features { margin: 20px 0; }
    ul { margin: 10px 0 20px 20px; }
  `]
})
export class HomeComponent { }