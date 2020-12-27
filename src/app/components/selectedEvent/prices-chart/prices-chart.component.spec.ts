import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricesChartComponent } from './prices-chart.component';

describe('PricesChartComponent', () => {
  let component: PricesChartComponent;
  let fixture: ComponentFixture<PricesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricesChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
