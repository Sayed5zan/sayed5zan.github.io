import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tic-tac-toe',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="game-board-container">
        <h2 class="game-status" [class.winner]="winner" [class.draw]="draw">{{ statusMessage }}</h2>

        <div class="board">
            <button *ngFor="let val of squares; let i = index" class="square" [class.x]="val === 'X'"
                [class.o]="val === 'O'" (click)="makeMove(i)" [disabled]="winner || val">
                {{ val }}
            </button>
        </div>

        <button class="reset-btn" (click)="newGame()">New Game</button>
    </div>
    `,
    styles: [`
    .game-board-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
    }

    .game-status {
        font-size: 2rem;
        font-weight: 700;
        color: #fff;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);

        &.winner {
            color: var(--accent);
            text-shadow: 0 0 20px var(--accent);
            animation: pulse 1s infinite;
        }

        &.draw {
            color: #888;
        }
    }

    .board {
        display: grid;
        grid-template-columns: repeat(3, 100px);
        grid-template-rows: repeat(3, 100px);
        gap: 10px;
        background: rgba(255, 255, 255, 0.1);
        padding: 10px;
        border-radius: 15px;
    }

    .square {
        background: rgba(0, 0, 0, 0.3);
        border: none;
        border-radius: 8px;
        font-size: 3rem;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;

        &:hover:not([disabled]) {
            background: rgba(255, 255, 255, 0.1);
        }

        &.x {
            color: #ff4d4d;
            text-shadow: 0 0 10px #ff4d4d;
        }

        &.o {
            color: #4d79ff;
            text-shadow: 0 0 10px #4d79ff;
        }
    }

    .reset-btn {
        padding: 12px 30px;
        font-size: 1.1rem;
        background: var(--accent);
        color: #000;
        border: none;
        border-radius: 30px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            transform: scale(1.05);
            box-shadow: 0 0 20px var(--accent);
        }
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }

    @media (max-width: 400px) {
        .board {
            grid-template-columns: repeat(3, 80px);
            grid-template-rows: repeat(3, 80px);
        }

        .square {
            font-size: 2.5rem;
        }
    }
    `]
})
export class TicTacToeComponent {
    squares: string[] = Array(9).fill(null);
    xIsNext: boolean = true; // Player is X and goes first
    winner: string | null = null;
    draw: boolean = false;
    isComputerThinking = false;

    get statusMessage() {
        if (this.winner) return this.winner === 'X' ? 'You Win! 🎉' : 'Computer Wins! 🤖';
        if (this.draw) return "It's a Draw! 🤝";
        return this.xIsNext ? 'Your Turn' : 'Computer is thinking...';
    }

    makeMove(idx: number) {
        // Prevent move if square taken, game over, or computer is thinking
        if (this.squares[idx] || this.winner || this.isComputerThinking) {
            return;
        }

        // Player Move (X)
        this.squares.splice(idx, 1, 'X');
        this.xIsNext = false;
        this.checkGameStatus();

        if (!this.winner && !this.draw) {
            this.isComputerThinking = true;
            setTimeout(() => this.makeComputerMove(), 600); // Delay for realism
        }
    }

    makeComputerMove() {
        if (this.winner || this.draw) return;

        // Simple AI Logic
        let moveIdx = -1;

        // 1. Try to Win
        moveIdx = this.findWinningMove('O');

        // 2. Block Player
        if (moveIdx === -1) {
            moveIdx = this.findWinningMove('X');
        }

        // 3. Take Center
        if (moveIdx === -1 && !this.squares[4]) {
            moveIdx = 4;
        }

        // 4. Random Available
        if (moveIdx === -1) {
            const available = this.squares.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[];
            if (available.length > 0) {
                moveIdx = available[Math.floor(Math.random() * available.length)];
            }
        }

        if (moveIdx !== -1) {
            this.squares.splice(moveIdx, 1, 'O');
            this.xIsNext = true;
            this.isComputerThinking = false;
            this.checkGameStatus();
        }
    }

    findWinningMove(player: string): number {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const [a, b, c] of lines) {
            const values = [this.squares[a], this.squares[b], this.squares[c]];
            const count = values.filter(v => v === player).length;
            const empty = values.filter(v => v === null).length;

            if (count === 2 && empty === 1) {
                if (this.squares[a] === null) return a;
                if (this.squares[b] === null) return b;
                if (this.squares[c] === null) return c;
            }
        }
        return -1;
    }

    checkGameStatus() {
        this.winner = this.calculateWinner();
        if (!this.winner && this.squares.every(square => square)) {
            this.draw = true;
        }
    }

    calculateWinner() {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (
                this.squares[a] &&
                this.squares[a] === this.squares[b] &&
                this.squares[a] === this.squares[c]
            ) {
                return this.squares[a];
            }
        }
        return null;
    }

    newGame() {
        this.squares = Array(9).fill(null);
        this.winner = null;
        this.draw = false;
        this.xIsNext = true;
        this.isComputerThinking = false;
    }
}
