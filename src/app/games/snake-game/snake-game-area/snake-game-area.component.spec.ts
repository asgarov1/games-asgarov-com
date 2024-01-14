import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeGameAreaComponent } from './snake-game-area.component';

describe('SnakeGameAreaComponent', () => {
  let component: SnakeGameAreaComponent;
  let fixture: ComponentFixture<SnakeGameAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakeGameAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnakeGameAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
