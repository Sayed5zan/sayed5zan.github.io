import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './sidebar.html',
    styleUrls: ['./sidebar.scss']
})
export class SidebarComponent {
    activeFragment: string | null = null;

    menuItems = [
        { icon: 'home', label: 'Home', link: '/', fragment: 'hero', type: 'internal' },
        { icon: 'person', label: 'About', link: '/', fragment: 'about', type: 'internal' },
        { icon: 'inventory_2', label: 'Projects', link: '/', fragment: 'work', type: 'internal' },
        { icon: 'sports_esports', label: 'Playground', link: '/playground', type: 'internal' },
        { icon: 'description', label: 'Resume', link: 'assets/Faizi_resume.pdf', type: 'download' },
        { icon: 'link', label: 'LinkedIn', link: 'https://www.linkedin.com/in/sayed-fayzan-sulaiman-616896264/', type: 'external' },
        { icon: 'code', label: 'GitHub', link: 'https://github.com/Sayed5zan', type: 'external' },
        { icon: 'mail', label: 'Contact', link: '/', fragment: 'contact', type: 'internal' }
    ];

    constructor() {
        // Initialize active fragment based on current scroll or default to hero
        if (typeof window !== 'undefined') {
            this.onScroll();
        }
    }

    @HostListener('window:scroll')
    onScroll() {
        if (typeof window === 'undefined') return;

        const sections = this.menuItems
            .filter(item => item.type === 'internal' && item.fragment)
            .map(item => item.fragment as string);

        let currentSection = null;

        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                // Check if section is in viewport (with some offset)
                if (rect.top <= 150 && rect.bottom >= 150) {
                    currentSection = section;
                    break;
                }
            }
        }

        // Special case: if at the very top, set to hero
        if (window.scrollY < 50) {
            currentSection = 'hero';
        }

        this.activeFragment = currentSection;
    }
}
