import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="container">
      <header class="glass-container header">
        <h1>Warm Up Challenge</h1>
        <p>Your Intelligent Learning Assistant</p>
      </header>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .header {
      text-align: center;
      padding: 1.5rem;
    }
    .header h1 {
      margin: 0 0 0.5rem 0;
      font-size: 2rem;
      background: linear-gradient(90deg, #60A5FA, #A78BFA);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .header p {
      margin: 0;
      color: var(--color-text-secondary);
    }
  `]
})
export class AppComponent {
}
