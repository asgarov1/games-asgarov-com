import {Component, Input} from '@angular/core';
import {GameCard} from "../domain/game-card";
import {GameCardComponent} from "../game-card/game-card.component";
import {CommonModule} from "@angular/common";
import gameCardsData from "../data/game-cards.json";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-game-menu',
  standalone: true,
  imports: [GameCardComponent, CommonModule, RouterModule],
  templateUrl: './game-menu.component.html',
  styleUrl: './game-menu.component.css'
})
export class GameMenuComponent {
  gameCards: GameCard[];

  constructor() {
    this.gameCards = gameCardsData;
  }


}
