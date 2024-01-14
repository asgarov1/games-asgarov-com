import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSliderModule} from "@angular/material/slider";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-top-snake-panel',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatSliderModule,
    MatCardModule,
    FormsModule
  ],
  templateUrl: './top-snake-panel.component.html',
  styleUrl: './top-snake-panel.component.css'
})
export class TopSnakePanelComponent {

  @Input() currentScore!: number;
  @Output() onRestart = new EventEmitter();
  @Output() onColorChange = new EventEmitter<string>();
  @Output() onSpeedChange = new EventEmitter<number>();

  updateColor(color: string): void {
    this.onColorChange.emit(color);
  }

  updateSpeed(speedValue: number) {
    console.log(`changing speed to ${speedValue}`)
    this.onSpeedChange.emit(speedValue);
  }

  restart(): void {
    this.onRestart.emit();
  }
}
