import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


interface Project {
  id: number;
  title: string;
  role: string;
  image: string;
  github: string;
}

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work.html',
  styleUrls: ['./work.scss']
})
export class WorkComponent {
  projects = [
    {
      id: 1,
      title: 'Project Nimbus',
      role: 'Lead Frontend Designer',
      image: 'assets/nimbusThumbnail.jpg',
      github: 'https://github.com/Sayed5zan/Nimbus'
    },
    {
      id: 2,
      title: 'Conestoga Virtual Game Store',
      role: 'Full Stack Developer',
      image: 'assets/virtual.jpg',
      github: 'https://github.com/fsThere/GamesClub_TeamBlankSpace'
    },
    {
      id: 3,
      title: 'My GitHub',
      role: '',
      image: 'assets/github.png',
      github: 'https://github.com/Sayed5zan'
    }
  ];
}
