import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PROJECTS } from '../../data/projects.data';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './work.html',
  styleUrls: ['./work.scss']
})
export class WorkComponent {
  projects = PROJECTS;
}
