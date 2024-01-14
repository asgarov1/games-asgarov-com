import {Component, EventEmitter, Output} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {Direction} from "../../domain/direction";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-button-panel',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './button-panel.component.html',
  styleUrl: './button-panel.component.css'
})
export class ButtonPanelComponent {

  @Output() arrowButtonPressed = new EventEmitter<Direction>();

  pressed(direction: Direction): void {
    this.arrowButtonPressed.emit(direction);
  }

  protected readonly Direction = Direction;
}
