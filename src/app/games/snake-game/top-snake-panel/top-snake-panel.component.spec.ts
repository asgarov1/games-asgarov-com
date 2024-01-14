import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSnakePanelComponent } from './top-snake-panel.component';

describe('TopSnakePanelComponent', () => {
  let component: TopSnakePanelComponent;
  let fixture: ComponentFixture<TopSnakePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopSnakePanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopSnakePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
