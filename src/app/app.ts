import { Component } from '@angular/core';
import { WorkComponent } from "./components/work/work";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [WorkComponent]
})
export class AppComponent {
  year = new Date().getFullYear();
}
