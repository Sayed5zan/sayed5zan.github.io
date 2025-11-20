import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkComponent } from './components/work/work';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WorkComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'portfolio';

  ngAfterViewInit() {
    const cursor = document.querySelector('.cursor') as HTMLElement;

    if (cursor) {
      document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      });

      const interactiveElements = document.querySelectorAll('a, button, .btn-outline, input, textarea, select');

      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          document.body.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
          document.body.classList.remove('hovering');
        });
      });
    }
  }
}
