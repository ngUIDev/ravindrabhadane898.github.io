import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsiderSentimentComponent } from './insider-sentiment.component';

describe('InsiderSentimentComponent', () => {
  let component: InsiderSentimentComponent;
  let fixture: ComponentFixture<InsiderSentimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsiderSentimentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsiderSentimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
