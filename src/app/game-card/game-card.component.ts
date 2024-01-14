import {Component, Input} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {GameCard} from "../domain/game-card";

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css'
})
export class GameCardComponent {

  @Input() gameCard!: GameCard;

}
