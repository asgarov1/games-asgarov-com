import {Component, EventEmitter, HostListener, Output} from '@angular/core';
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

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      this.arrowButtonPressed.emit(Direction.DOWN);
    } else if (event.key === 'ArrowUp') {
      this.arrowButtonPressed.emit(Direction.UP);
    } else if (event.key === 'ArrowRight') {
      this.arrowButtonPressed.emit(Direction.RIGHT);
    } else if (event.key === 'ArrowLeft') {
      this.arrowButtonPressed.emit(Direction.LEFT);
    }
  }

  protected readonly Direction = Direction;
}
