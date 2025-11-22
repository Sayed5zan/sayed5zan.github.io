import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-whack-a-bug',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="whack-container">
        <div class="stats-board">
            <div class="stat">
                <span class="label">Score</span>
                <span class="value">{{ score }}</span>
            </div>
            <div class="stat">
                <span class="label">Time</span>
                <span class="value" [class.low]="timeLeft <= 10">{{ timeLeft }}s</span>
            </div>
        </div>

        <div class="game-grid" [class.active]="isPlaying">
            <div *ngFor="let active of bugs; let i = index" 
                 class="hole" 
                 (click)="whack(i)">
                <div class="bug" *ngIf="active">🐛</div>
            </div>
        </div>

        <div class="controls">
            <button class="start-btn" *ngIf="!isPlaying" (click)="startGame()">
                {{ timeLeft === 0 ? 'Play Again' : 'Start Game' }}
            </button>
            <p class="message" *ngIf="message">{{ message }}</p>
        </div>
    </div>
  `,
    styles: [`
    .whack-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
        max-width: 500px;
        margin: 0 auto;
    }

    .stats-board {
        display: flex;
        gap: 50px;
        background: rgba(255, 255, 255, 0.05);
        padding: 15px 40px;
        border-radius: 50px;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .stat {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .label {
        font-size: 0.9rem;
        color: #888;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .value {
        font-size: 2rem;
        font-weight: 700;
        color: #fff;
        font-variant-numeric: tabular-nums;

        &.low {
            color: #ff4d4d;
            animation: pulse 1s infinite;
        }
    }

    .game-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
        padding: 20px;
        background: #1a1a1a;
        border-radius: 20px;
        border: 4px solid #333;
        width: 100%;
        aspect-ratio: 1;
        opacity: 0.7;
        transition: opacity 0.3s ease;

        &.active {
            opacity: 1;
            border-color: var(--accent);
            box-shadow: 0 0 30px rgba(230, 107, 45, 0.2);
        }
    }

    .hole {
        background: #000;
        border-radius: 50%;
        position: relative;
        cursor: pointer;
        overflow: hidden;
        box-shadow: inset 0 5px 10px rgba(0,0,0,0.8);
        
        &::after {
            content: '';
            display: block;
            padding-bottom: 100%;
        }
    }

    .bug {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        animation: popUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        user-select: none;
    }

    .start-btn {
        padding: 15px 40px;
        font-size: 1.2rem;
        background: var(--accent);
        color: #000;
        border: none;
        border-radius: 30px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            transform: scale(1.05);
            box-shadow: 0 0 20px var(--accent);
        }
    }

    .message {
        margin-top: 15px;
        color: #888;
        font-size: 1.1rem;
    }

    @keyframes popUp {
        0% { transform: translate(-50%, 50%) scale(0); }
        100% { transform: translate(-50%, -50%) scale(1); }
    }

    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
    }
  `]
})
export class WhackABugComponent implements OnDestroy {
    bugs: boolean[] = Array(9).fill(false);
    score = 0;
    timeLeft = 30;
    isPlaying = false;
    message = '';

    private gameInterval: any;
    private timerInterval: any;
    private bugTimeout: any;

    startGame() {
        if (this.isPlaying) return;

        this.score = 0;
        this.timeLeft = 30;
        this.isPlaying = true;
        this.message = '';
        this.bugs.fill(false);

        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);

        this.showRandomBug();
    }

    showRandomBug() {
        if (!this.isPlaying) return;

        // Hide all bugs
        this.bugs.fill(false);

        // Pick random hole
        const randomIdx = Math.floor(Math.random() * 9);
        this.bugs[randomIdx] = true;

        // Determine speed based on score (faster as you get better)
        const speed = Math.max(400, 1000 - (this.score * 20));

        // Schedule next bug move if not whacked
        this.bugTimeout = setTimeout(() => {
            if (this.isPlaying) {
                this.showRandomBug();
            }
        }, speed);
    }

    whack(index: number) {
        if (!this.isPlaying || !this.bugs[index]) return;

        this.score++;
        this.bugs[index] = false;

        // Clear existing timeout and show next bug immediately
        clearTimeout(this.bugTimeout);
        this.showRandomBug();
    }

    endGame() {
        this.isPlaying = false;
        this.message = `Game Over! You fixed ${this.score} bugs! 🐛`;
        this.bugs.fill(false);
        this.clearTimers();
    }

    clearTimers() {
        clearInterval(this.timerInterval);
        clearTimeout(this.bugTimeout);
    }

    ngOnDestroy() {
        this.clearTimers();
    }
}
