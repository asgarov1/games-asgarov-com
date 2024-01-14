import {Component, EventEmitter, Output} from '@angular/core';
import {Direction} from "../../../domain/direction";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-top-snake-panel',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './top-snake-panel.component.html',
  styleUrl: './top-snake-panel.component.css'
})
export class TopSnakePanelComponent {

  @Output() onRestart = new EventEmitter();
  @Output() onColorChange = new EventEmitter<string>();

  updateColor(color: string): void {
    this.onColorChange.emit(color);
  }

  restart(): void {
    this.onRestart.emit();
  }
}
