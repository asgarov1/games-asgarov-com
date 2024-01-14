import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Point} from "../../../domain/point";
import {Direction} from "../../../domain/direction";
import {NumberUtil} from "../../../util/number-util";

@Component({
  selector: 'app-snake-game-area',
  standalone: true,
  imports: [],
  templateUrl: './snake-game-area.component.html',
  styleUrl: './snake-game-area.component.css'
})
export class SnakeGameAreaComponent implements OnInit {

  private lost = false;
  private readonly GRID_SIZE = 21;

  private readonly defaultDirection = Direction.RIGHT;
  private _currentDirection: Direction = this.defaultDirection;
  private timeout: any;


  private readonly originalSnakeBody: Point[] = [{x: 11, y: 11}, {x: 10, y: 11}, {x: 9, y: 11}, {x: 8, y: 11}];
  private snakeBody: Point[] = [];
  private snakeFood!: Point;

  @Input() snakeColor = "blueviolet";
  @Input() directions: Direction[] = []
  @Input() snakeSpeed = 2;

  @ViewChild('gameBoard', {static: true}) gameBoard!: ElementRef;

  ngOnInit(): void {
    this.thisInitializeGame();
    this.makeSnakeMove();
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
    // removed directions from last game if any
    while (this.directions.length) {
      this.directions.shift()
    }

    // cancel previously scheduled makeMove
    clearTimeout(this.timeout)

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

      if (this.directions.length) {
        this.currentDirection = this.directions.shift() as Direction
      }

      this.updateIfFoodWasEaten();
      if (this.isFoodEaten()) {
        this.snakeFood = this.getRandomPointThatIsNotSnake(this.snakeBody);
      }
      this.updateSnakeCoordinates();
      this.drawSnake();
      this.drawFood();
      if (this.hasLost(this.snakeBody)) {
        this.lost = true;
      }

      let msInSecond = 1000;
      this.timeout = setTimeout(() => this.makeSnakeMove(), msInSecond / this.snakeSpeed);
    }
  }

  updateSnakeCoordinates(): void {
    // update everything except head
    for (let i = this.snakeBody.length - 2; i >= 0; i--) {
      if (this.snakeBody[i + 1].newCell) {
        this.snakeBody[i + 1].newCell = false
      } else {
        this.snakeBody[i + 1] = {...this.snakeBody[i]};
      }
    }

    // update the head
    if (this._currentDirection == Direction.RIGHT) {
      this.snakeBody[0].x += 1;
    } else if (this._currentDirection == Direction.LEFT) {
      this.snakeBody[0].x -= 1;
    } else if (this._currentDirection == Direction.DOWN) {
      this.snakeBody[0].y += 1;
    } else if (this._currentDirection == Direction.UP) {
      this.snakeBody[0].y -= 1;
    }

    this.snakeBody.forEach(cell => this.redrawSnakeOnTheOtherSideOfTheWallIfNecessary(cell));
  }

  private redrawSnakeOnTheOtherSideOfTheWallIfNecessary(snakeCell: Point) {
    if (snakeCell.x > this.GRID_SIZE) {
      snakeCell.x = 0;
    } else if (snakeCell.x < 0) {
      snakeCell.x = this.GRID_SIZE;
    } else if (snakeCell.y > this.GRID_SIZE) {
      snakeCell.y = 0;
    } else if (snakeCell.y < 0) {
      snakeCell.y = this.GRID_SIZE;
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

    const snakeDivs = this.snakeBody.map(segment => {
      const snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = "" + segment.y;
      snakeElement.style.gridColumnStart = "" + segment.x;
      if (this.hasLost(this.snakeBody) && this.isAtHeadCoordinate(segment)) {
        snakeElement.style.backgroundColor = 'red';
      } else {
        snakeElement.style.backgroundColor = this.snakeColor;
      }

      snakeElement.style.border = ".15vmin solid black";
      snakeElement.style.zIndex = "1000";
      return snakeElement;
    })


    snakeDivs.forEach(div => this.gameBoard.nativeElement.appendChild(div))
  }

  private isAtHeadCoordinate(segment: Point) {
    return segment.x === this.snakeBody[0].x && segment.y === this.snakeBody[0].y;
  }

  private hasLost(snakeBody: Point[]): boolean {
    const subArrayWithoutHead = snakeBody.slice(1);
    return subArrayWithoutHead.some(segment => segment.x === snakeBody[0].x && segment.y === snakeBody[0].y)
  }

  private isFoodEaten() {
    return this.snakeBody[0].x == this.snakeFood.x && this.snakeBody[0].y === this.snakeFood.y;
  }

  private updateIfFoodWasEaten() {
    if (this.isFoodEaten()) {
      const currentLength = this.snakeBody.length;
      const lastCell = this.snakeBody[currentLength - 1];
      const newCell = {x: lastCell.x, y: lastCell.y, newCell: true};
      this.snakeBody.push(newCell)
    }
  }
}
