import {Component, ViewChild} from '@angular/core';
import {ButtonPanelComponent} from "../../parts/button-panel/button-panel.component";
import {SnakeGameAreaComponent} from "./snake-game-area/snake-game-area.component";
import {Direction} from "../../domain/direction";
import {MatIconModule} from "@angular/material/icon";
import {TopSnakePanelComponent} from "./top-snake-panel/top-snake-panel.component";

@Component({
  selector: 'app-snake-game',
  standalone: true,
  imports: [ButtonPanelComponent, SnakeGameAreaComponent, MatIconModule, TopSnakePanelComponent],
  templateUrl: './snake-game.component.html',
  styleUrl: './snake-game.component.css'
})
export class SnakeGameComponent {

  @ViewChild(SnakeGameAreaComponent) gameAreaComponent!: SnakeGameAreaComponent;

  currentSnakeColor = "blueviolet";
  snakeDirections = [Direction.RIGHT]
  snakeSpeed = 2;

  processArrowButtonPressed(newDirection: Direction): void {
    console.log(`Received direction ${newDirection}`);
    if (this.isOppositeDirection(this.gameAreaComponent.currentDirection, newDirection)) {
      console.log("Not adding a direction, since opposite direction is not possible")
      return;
    }

    this.snakeDirections.push(newDirection);
  }

  private isOppositeDirection(currentDirection: Direction, newDirection: Direction): boolean {
    return currentDirection === Direction.UP && newDirection === Direction.DOWN
          || currentDirection === Direction.DOWN && newDirection === Direction.UP
          || currentDirection === Direction.LEFT && newDirection === Direction.RIGHT
          || currentDirection === Direction.RIGHT && newDirection === Direction.LEFT
  }

  restart(): void {
    this.gameAreaComponent.restart();
  }

  updateSnakeColor(snakeColor: string) {
    this.currentSnakeColor = snakeColor;
  }

  updateSnakeSpeed(snakeSpeed: number) {
    this.snakeSpeed = snakeSpeed;
  }
}
