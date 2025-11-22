import { Component, ElementRef, ViewChild, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-scribble',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './scribble.html',
    styleUrls: ['./scribble.scss']
})
export class ScribbleComponent implements AfterViewInit, OnDestroy {
    @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
    private ctx!: CanvasRenderingContext2D;
    private isDrawing = false;
    private lastX = 0;
    private lastY = 0;

    private resizeObserver: ResizeObserver | null = null;
    isDrawingMode = false; // Default to off

    ngAfterViewInit() {
        const canvas = this.canvasRef.nativeElement;
        this.ctx = canvas.getContext('2d')!;

        // Initial resize
        this.resizeCanvas();

        // Set initial drawing style
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'; // Semi-transparent white
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        // Observe body size changes
        if (typeof ResizeObserver !== 'undefined') {
            this.resizeObserver = new ResizeObserver(() => {
                this.resizeCanvas();
            });
            this.resizeObserver.observe(document.body);
        }

        // Set initial body class
        if (this.isDrawingMode) {
            document.body.classList.add('drawing-active');
        }
    }

    toggleDrawingMode() {
        this.isDrawingMode = !this.isDrawingMode;
        if (this.isDrawingMode) {
            document.body.classList.add('drawing-active');
        } else {
            document.body.classList.remove('drawing-active');
        }
    }

    ngOnDestroy() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }

    @HostListener('window:resize')
    resizeCanvas() {
        const canvas = this.canvasRef.nativeElement;
        // Save current content
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) {
            tempCtx.drawImage(canvas, 0, 0);
        }

        // Resize to full document size
        const width = window.innerWidth;
        const height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        // Ensure CSS size matches attribute size to prevent scaling
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        // Restore content
        this.ctx.drawImage(tempCanvas, 0, 0);

        // Reset styles after resize
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
    }

    @HostListener('document:mousemove', ['$event'])
    onMouseMove(e: MouseEvent) {
        if (!this.ctx || !this.isDrawingMode) return;

        // If this is the first move, just set the position
        if (!this.isDrawing) {
            this.isDrawing = true;
            this.lastX = e.pageX;
            this.lastY = e.pageY;
            return;
        }

        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(e.pageX, e.pageY);
        this.ctx.stroke();

        this.lastX = e.pageX;
        this.lastY = e.pageY;
    }

    clearCanvas() {
        const canvas = this.canvasRef.nativeElement;
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}
