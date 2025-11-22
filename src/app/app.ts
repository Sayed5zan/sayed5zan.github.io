import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { ScribbleComponent } from './components/scribble/scribble';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ScribbleComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'portfolio';

  constructor(private router: Router) { }

  ngOnInit() {
    // Scroll to top on route change
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }

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
