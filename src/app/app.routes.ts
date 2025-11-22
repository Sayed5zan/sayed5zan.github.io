import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home';
import { ProjectDetailsComponent } from './components/project-details/project-details';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'playground', loadComponent: () => import('./components/playground/playground').then(m => m.PlaygroundComponent) },
    { path: 'projects/:id', component: ProjectDetailsComponent },
    { path: '**', redirectTo: '' }
];
