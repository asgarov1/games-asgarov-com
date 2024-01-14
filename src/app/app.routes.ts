import { Routes } from '@angular/router';
import {GameMenuComponent} from "./game-menu/game-menu.component";
import {SnakeGameComponent} from "./games/snake-game/snake-game.component";

export const routes: Routes = [
  {path: '', component: GameMenuComponent},
  {path: 'snake', component: SnakeGameComponent},
];
