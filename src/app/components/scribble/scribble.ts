import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TrailParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    hue: number;
}

@Component({
    selector: 'app-scribble',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './scribble.html',
    styleUrls: ['./scribble.scss']
})
export class ScribbleComponent implements AfterViewInit, OnDestroy {
    @ViewChild('trailCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

    cursorX = 0;
    cursorY = 0;
    cursorDotX = 0;
    cursorDotY = 0;
    isHovering = false;

    private ctx!: CanvasRenderingContext2D;
    private animationFrame: number | null = null;
    private particles: TrailParticle[] = [];
    private lastX = 0;
    private lastY = 0;
    private velocity = 0;

    ngAfterViewInit() {
        const canvas = this.canvasRef.nativeElement;
        this.ctx = canvas.getContext('2d')!;
        this.resizeCanvas();

        document.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('resize', this.resizeCanvas);
        this.addHoverListeners();
        this.animate();

        document.body.style.cursor = 'none';
    }

    ngOnDestroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        document.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('resize', this.resizeCanvas);
        document.body.style.cursor = 'auto';
    }

    private resizeCanvas = () => {
        const canvas = this.canvasRef.nativeElement;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    private onMouseMove = (e: MouseEvent) => {
        this.cursorDotX = e.clientX;
        this.cursorDotY = e.clientY;

        const dx = e.clientX - this.lastX;
        const dy = e.clientY - this.lastY;
        this.velocity = Math.sqrt(dx * dx + dy * dy);

        if (this.velocity > 0.5) {
            this.createTrailParticles(e.clientX, e.clientY);
        }

        this.lastX = e.clientX;
        this.lastY = e.clientY;
    }

    private createTrailParticles(x: number, y: number) {
        const particleCount = Math.min(Math.floor(this.velocity / 2), 5);

        for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 0.5;
            const hue = 15 + Math.random() * 30;

            this.particles.push({
                x: x + (Math.random() - 0.5) * 10,
                y: y + (Math.random() - 0.5) * 10,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                maxLife: 60 + Math.random() * 40,
                size: 3 + Math.random() * 4,
                hue: hue
            });
        }
    }

    private animate = () => {
        const dx = this.cursorDotX - this.cursorX;
        const dy = this.cursorDotY - this.cursorY;

        this.cursorX += dx * 0.15;
        this.cursorY += dy * 0.15;

        this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.95;
            p.vy *= 0.95;
            p.life--;

            if (p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            const alpha = p.life / p.maxLife;
            const saturation = 80 + Math.random() * 20;
            const lightness = 50 + Math.random() * 20;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${p.hue}, ${saturation}%, ${lightness}%, ${alpha * 0.8})`;
            this.ctx.fill();

            const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * alpha * 2);
            gradient.addColorStop(0, `hsla(${p.hue}, ${saturation}%, ${lightness}%, ${alpha * 0.4})`);
            gradient.addColorStop(1, `hsla(${p.hue}, ${saturation}%, ${lightness}%, 0)`);
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * alpha * 2, 0, Math.PI * 2);
            this.ctx.fill();
        }

        this.animationFrame = requestAnimationFrame(this.animate);
    }

    private addHoverListeners() {
        const interactiveSelectors = 'a, button, .btn-outline, .project-card, .game-card, .nav-item';
        const elements = document.querySelectorAll(interactiveSelectors);

        elements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.isHovering = true;
            });

            el.addEventListener('mouseleave', () => {
                this.isHovering = false;
            });
        });
    }
}
