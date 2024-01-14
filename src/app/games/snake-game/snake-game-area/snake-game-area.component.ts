import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Point} from "../../../domain/point";
import {Direction} from "../../../domain/direction";
import {NumberUtil} from "../../../util/number-util";
import {last} from "rxjs";

@Component({
  selector: 'app-snake-game-area',
  standalone: true,
  imports: [],
  templateUrl: './snake-game-area.component.html',
  styleUrl: './snake-game-area.component.css'
})
export class SnakeGameAreaComponent implements OnInit {

  private readonly DELAY_BETWEEN_MOVES = 500;
  private lost = false;


  private readonly originalSnakeBody: Point[] = [{x: 11, y: 11}, {x: 10, y: 11}, {x: 9, y: 11}, {x: 8, y: 11}];
  private snakeBody: Point[] = [];
  private snakeFood!: Point;

  @Input() snakeColor = "blueviolet";
  private readonly defaultDirection = Direction.RIGHT;
  private _currentDirection: Direction = this.defaultDirection;

  @ViewChild('gameBoard') gameBoard!: ElementRef;

  constructor() {
    this.thisInitializeGame();
  }

  ngOnInit(): void {
    setTimeout(() => this.makeSnakeMove(), 0);
  }

  set currentDirection(value: Direction) {
    this._currentDirection = value;
  }


  get currentDirection(): Direction {
    return this._currentDirection;
  }

  restart(): void {
    this.thisInitializeGame();
    this.makeSnakeMove();
  }

  private thisInitializeGame() {
    this.currentDirection = this.defaultDirection;
    this.lost = false;

    this.snakeBody = []
    for (let i = 0; i < this.originalSnakeBody.length; i++) {
      this.snakeBody[i] = {...this.originalSnakeBody[i]};
    }

    this.snakeFood = this.getRandomPointThatIsNotSnake(this.snakeBody);
  }

  private getRandomPointThatIsNotSnake(snakeBody: Point[]) {
    let maxTries = 500;
    for (let i = 0; i < maxTries; i++) {
      const x = NumberUtil.getRandomInt(0, this.GRID_SIZE)
      const y = NumberUtil.getRandomInt(0, this.GRID_SIZE)

      if (snakeBody.some(cell => cell.x === x && cell.y === y)) {
        continue;
      }

      return {x: x, y: y}
    }
    throw Error(`maxTries of ${maxTries} exceeded, can't find free space, you probably won!`)
  }

  makeSnakeMove(): void {
    if (this.lost) {
      window.alert("You lost");
    } else {
      console.log("making a move");

      this.updateSnakeCoordinates();
      this.updateIfFoodWasEaten();
      if (this.isFoodEaten()) {
        this.snakeFood = this.getRandomPointThatIsNotSnake(this.snakeBody);
      }
      this.drawSnake();
      this.drawFood();
      if (this.hasLost(this.snakeBody)) {
        this.lost = true;
      }

      setTimeout(() => this.makeSnakeMove(), this.DELAY_BETWEEN_MOVES);
    }
  }

  private readonly GRID_SIZE = 21;

  updateSnakeCoordinates(): void {
    for (let i = this.snakeBody.length - 2; i >= 0; i--) {
      this.snakeBody[i + 1] = {...this.snakeBody[i]}
    }

    if (this._currentDirection == Direction.RIGHT) {
      this.snakeBody[0].x += 1;
    } else if (this._currentDirection == Direction.LEFT) {
      this.snakeBody[0].x -= 1;
    } else if (this._currentDirection == Direction.DOWN) {
      this.snakeBody[0].y += 1;
    } else if (this._currentDirection == Direction.UP) {
      this.snakeBody[0].y -= 1;
    }

    this.redrawSnakeOnTheOtherSideOfTheWallIfNecessary();
  }

  private redrawSnakeOnTheOtherSideOfTheWallIfNecessary() {
    if (this.snakeBody[0].x > this.GRID_SIZE) {
      this.snakeBody[0].x = 0;
    } else if (this.snakeBody[0].x < 0) {
      this.snakeBody[0].x = this.GRID_SIZE;
    } else if (this.snakeBody[0].y > this.GRID_SIZE) {
      this.snakeBody[0].y = 0;
    } else if (this.snakeBody[0].y < 0) {
      this.snakeBody[0].y = this.GRID_SIZE;
    }
  }

  drawFood(): void {
    const food = document.createElement('div');
    food.style.gridRowStart = "" + this.snakeFood.y;
    food.style.gridColumnStart = "" + this.snakeFood.x;
    food.style.backgroundColor = 'yellow';
    food.style.border = ".15vmin solid black";

    this.gameBoard.nativeElement.appendChild(food);
  }

  drawSnake(): void {
    while (this.gameBoard.nativeElement.firstChild) {
      this.gameBoard.nativeElement.removeChild(this.gameBoard.nativeElement.firstChild);
    }

    this.snakeBody.forEach(segment => {
      const snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = "" + segment.y;
      snakeElement.style.gridColumnStart = "" + segment.x;
      if (this.hasLost(this.snakeBody) && this.isAtHeadCoordinate(segment)) {
        snakeElement.style.backgroundColor = 'red';
      } else {
        snakeElement.style.backgroundColor = this.snakeColor;
      }

      if (this.isAtHeadCoordinate(segment)) {
        let icon = document.createElement('i');
        icon.className = 'material-icons';
        icon.innerText = 'tag_faces';
        snakeElement.appendChild(icon);
        snakeElement.classList.add('center-flex-container')
      }

      snakeElement.style.border = ".15vmin solid black";
      this.gameBoard.nativeElement.appendChild(snakeElement);
    })
  }

  private isAtHeadCoordinate(segment: Point) {
    return segment.x === this.snakeBody[0].x && segment.y === this.snakeBody[0].y;
  }

  private hasLost(snakeBody: Point[]): boolean {
    const subArrayWithoutHead = snakeBody.slice(1);
    return subArrayWithoutHead.some(segment => segment.x === snakeBody[0].x && segment.y === snakeBody[0].y)
  }

  private updateIfFoodWasEaten() {
    if (this.isFoodEaten()) {
      const currentLength = this.snakeBody.length;
      const lastCell = this.snakeBody[currentLength-1];
      const newCell = {x: lastCell.x, y: lastCell.y};

      if (this._currentDirection == Direction.RIGHT) {
        newCell.x -= 1;
      } else if (this._currentDirection == Direction.LEFT) {
        newCell.x += 1;
      } else if (this._currentDirection == Direction.DOWN) {
        newCell.y -= 1;
      } else if (this._currentDirection == Direction.UP) {
        newCell.y += 1;
      }
      this.snakeBody.push(newCell)
    }
  }

  private isFoodEaten() {
    return this.snakeBody[0].x == this.snakeFood.x && this.snakeBody[0].y === this.snakeFood.y;
  }
}
