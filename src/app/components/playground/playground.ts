import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicTacToeComponent } from './games/tic-tac-toe/tic-tac-toe';
import { SnakeComponent } from './games/snake/snake';
import { WhackABugComponent } from './games/whack-a-bug/whack-a-bug';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-playground',
    standalone: true,
    imports: [CommonModule, TicTacToeComponent, SnakeComponent, WhackABugComponent, RouterLink],
    templateUrl: './playground.html',
    styleUrls: ['./playground.scss']
})
export class PlaygroundComponent {
    activeGame: 'menu' | 'tictactoe' | 'snake' | 'whackabug' = 'menu';

    selectGame(game: 'tictactoe' | 'snake' | 'whackabug') {
        this.activeGame = game;
    }

    backToMenu() {
        this.activeGame = 'menu';
    }
}
