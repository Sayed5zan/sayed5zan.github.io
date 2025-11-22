import { Component } from '@angular/core';
import { WorkComponent } from '../work/work';
import { SidebarComponent } from '../sidebar/sidebar';
import { TechStackComponent } from '../tech-stack/tech-stack';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [WorkComponent, SidebarComponent, TechStackComponent],
    templateUrl: './home.html',
    styleUrl: './home.scss'
})
export class HomeComponent { }
