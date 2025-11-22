import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tech-stack',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './tech-stack.html',
    styleUrls: ['./tech-stack.scss']
})
export class TechStackComponent {
    technologies = [
        { name: 'Angular', icon: 'https://cdn.simpleicons.org/angular/ffffff' },
        { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/ffffff' },
        { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/ffffff' },
        { name: 'HTML5', icon: 'https://cdn.simpleicons.org/html5/ffffff' },
        { name: 'CSS3', icon: 'https://cdn.simpleicons.org/css/ffffff' },
        { name: 'SASS', icon: 'https://cdn.simpleicons.org/sass/ffffff' },
        { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/ffffff' },
        { name: 'Git', icon: 'https://cdn.simpleicons.org/git/ffffff' },
        { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/ffffff' },
        { name: 'VS Code', icon: 'assets/vscode.svg' }
    ];

    // Duplicate for seamless loop
    displayTechs = [...this.technologies, ...this.technologies];
}
