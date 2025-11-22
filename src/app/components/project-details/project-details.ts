import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Project, PROJECTS } from '../../data/projects.data';

@Component({
    selector: 'app-project-details',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './project-details.html',
    styleUrls: ['./project-details.scss']
})
export class ProjectDetailsComponent implements OnInit {
    project: Project | undefined;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.project = PROJECTS.find(p => p.id === id);
    }
}
