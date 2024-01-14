import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import gameCardsData from './data/game-cards.json';
import {GameCard} from "./domain/game-card";
import {GameCardComponent} from "./game-card/game-card.component";
import {GameMenuComponent} from "./game-menu/game-menu.component";
import {NavBarComponent} from "./nav-bar/nav-bar.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CommonModule, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  gameCards: GameCard[];
  constructor() {
    this.gameCards = gameCardsData;
  }
  ngOnInit(): void {

  }


}
