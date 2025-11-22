import { Component, ElementRef, HostListener, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-snake',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="snake-container">
        <div class="score-board">
            <span>Score: {{ score }}</span>
            <span>High Score: {{ highScore }}</span>
        </div>

        <div class="canvas-wrapper">
            <canvas #gameCanvas width="400" height="400"></canvas>

            <div class="overlay" *ngIf="!isGameRunning || isGameOver">
                <h2 *ngIf="isGameOver" class="game-over">Game Over!</h2>
                <button class="start-btn" (click)="startGame()">
                    {{ isGameOver ? 'Try Again' : 'Start Game' }}
                </button>
                <p class="instructions">Use Arrow Keys to Move</p>
            </div>
        </div>
    </div>
    `,
    styles: [`
    .snake-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

    .score-board {
        display: flex;
        gap: 40px;
        font-size: 1.5rem;
        font-weight: bold;
        color: #fff;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    }

    .canvas-wrapper {
        position: relative;
        border: 4px solid #333;
        border-radius: 8px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        background: #000;
    }

    canvas {
        display: block;
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }

    .game-over {
        color: #ff4d4d;
        font-size: 3rem;
        text-shadow: 0 0 20px #ff4d4d;
        animation: pulse 1s infinite;
    }

    .start-btn {
        padding: 15px 40px;
        font-size: 1.5rem;
        background: #00ff00;
        color: #000;
        border: none;
        border-radius: 50px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            transform: scale(1.1);
            box-shadow: 0 0 30px #00ff00;
        }
    }

    .instructions {
        color: #aaa;
        font-size: 1rem;
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    `]
})
export class SnakeComponent implements AfterViewInit, OnDestroy {
    @ViewChild('gameCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
    private ctx!: CanvasRenderingContext2D;

    // Game Config
    private readonly gridSize = 20;
    private tileCount = 20;
    private gameSpeed = 100; // ms

    // Game State
    private snake: { x: number, y: number }[] = [];
    private food: { x: number, y: number } = { x: 15, y: 15 };
    private dx = 0;
    private dy = 0;
    score = 0;
    highScore = 0;
    private gameLoopId: any;
    isGameRunning = false;
    isGameOver = false;

    ngAfterViewInit() {
        const canvas = this.canvasRef.nativeElement;
        this.ctx = canvas.getContext('2d')!;
        this.tileCount = canvas.width / this.gridSize;

        // Load high score
        const saved = localStorage.getItem('snakeHighScore');
        if (saved) this.highScore = parseInt(saved, 10);

        this.draw();
    }

    ngOnDestroy() {
        this.stopGame();
    }

    startGame() {
        if (this.isGameRunning) return;

        this.snake = [{ x: 10, y: 10 }];
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.isGameRunning = true;
        this.isGameOver = false;
        this.placeFood();

        this.gameLoopId = setInterval(() => this.gameLoop(), this.gameSpeed);
    }

    stopGame() {
        if (this.gameLoopId) {
            clearInterval(this.gameLoopId);
            this.gameLoopId = null;
        }
        this.isGameRunning = false;
    }

    private gameLoop() {
        this.update();
        this.draw();
    }

    private update() {
        // Move snake
        const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };

        // Don't move if no direction set
        if (this.dx === 0 && this.dy === 0) return;

        // Check Wall Collision
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            this.gameOver();
            return;
        }

        // Check Self Collision
        for (let i = 0; i < this.snake.length; i++) {
            if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                this.gameOver();
                return;
            }
        }

        this.snake.unshift(head);

        // Check Food
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            if (this.score > this.highScore) {
                this.highScore = this.score;
                localStorage.setItem('snakeHighScore', this.highScore.toString());
            }
            this.placeFood();
        } else {
            this.snake.pop();
        }
    }

    private draw() {
        // Clear background
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

        // Draw Snake
        this.ctx.fillStyle = '#00ff00'; // Green snake
        for (let i = 0; i < this.snake.length; i++) {
            // Head is slightly different color
            this.ctx.fillStyle = i === 0 ? '#ccffcc' : '#00ff00';
            this.ctx.fillRect(
                this.snake[i].x * this.gridSize,
                this.snake[i].y * this.gridSize,
                this.gridSize - 2,
                this.gridSize - 2
            );
        }

        // Draw Food
        this.ctx.fillStyle = '#ff0000';
        this.ctx.fillRect(
            this.food.x * this.gridSize,
            this.food.y * this.gridSize,
            this.gridSize - 2,
            this.gridSize - 2
        );
    }

    private placeFood() {
        this.food = {
            x: Math.floor(Math.random() * this.tileCount),
            y: Math.floor(Math.random() * this.tileCount)
        };
        // Make sure food doesn't spawn on snake
        for (let part of this.snake) {
            if (part.x === this.food.x && part.y === this.food.y) {
                this.placeFood();
                break;
            }
        }
    }

    private gameOver() {
        this.stopGame();
        this.isGameOver = true;
    }

    @HostListener('window:keydown', ['$event'])
    handleKeydown(e: KeyboardEvent) {
        if (!this.isGameRunning) return;

        switch (e.key) {
            case 'ArrowUp':
                if (this.dy !== 1) { this.dx = 0; this.dy = -1; }
                break;
            case 'ArrowDown':
                if (this.dy !== -1) { this.dx = 0; this.dy = 1; }
                break;
            case 'ArrowLeft':
                if (this.dx !== 1) { this.dx = -1; this.dy = 0; }
                break;
            case 'ArrowRight':
                if (this.dx !== -1) { this.dx = 1; this.dy = 0; }
                break;
        }
    }
}
