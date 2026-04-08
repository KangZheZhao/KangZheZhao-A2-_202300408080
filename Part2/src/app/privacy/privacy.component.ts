import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  template: `
    <div class="privacy-container">
      <h2>🔒 Privacy & Security Policy</h2>
      <div class="policy-content">
        <h3>Data Storage</h3>
        <p>All inventory data is stored <strong>locally in your web browser</strong> using browser storage.</p>
        <p>No data is transmitted to or stored on any external server.</p>

        <h3>Data Usage</h3>
        <p>Your data is only used to power the inventory management features of this application.</p>
        <p>We do not collect, share, or sell any of your personal or inventory data.</p>

        <h3>Security</h3>
        <p>Your data is protected by your browser's built-in security features.</p>
        <p>Only you have access to the data stored in your browser.</p>

        <h3>Your Rights</h3>
        <p>You can delete all your inventory data at any time by clearing your browser's storage.</p>
      </div>
    </div>
  `,
  styles: [`
    .privacy-container { max-width: 800px; line-height: 1.6; }
    .policy-content { margin: 20px 0; }
    h3 { margin-top: 20px; color: #2c3e50; }
    strong { color: #dc3545; }
  `]
})
export class PrivacyComponent { }