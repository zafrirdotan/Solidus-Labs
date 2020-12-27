import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { combineLatest, Subscription } from 'rxjs';
import { EventsService } from 'src/app/services/eventsStore.service';

@Component({
  selector: 'app-prices-chart',
  templateUrl: './prices-chart.component.html',
  styleUrls: ['./prices-chart.component.scss']
})
// This chart shows the prices of the last, current of the selected event.  
export class PricesChartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,

  };
  public barChartLabels: Label[] = ['prev', 'current', 'next'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[]=[ ];
  $events: Subscription | undefined;
  constructor(public eventsService: EventsService) { }

  ngOnInit(): void {
    this.$events = combineLatest([this.eventsService.eventList$,this.eventsService.selectedEventIndex$])
    .subscribe(([eventList , selectedEventIndex])=>{
      // Find if the index is the first or last 
      const isFirstValue = selectedEventIndex === 0;
      const isLastValue = selectedEventIndex === eventList.length - 1;
      // If it is the first don't show previous value - start from the current index.
      // else start from the previous value 
      const startIndex = isFirstValue? 0: selectedEventIndex - 1;
      // If it is the last don't show next value - end at the current index.
      // else end at the next value 
      const endIndex = isLastValue?
                        selectedEventIndex:
                        selectedEventIndex + 2;
      // Take from the event list only the previous, current and next event  
      const chartItems = eventList.slice(startIndex, endIndex);

      // Create the Chart data 
       if(isFirstValue){
        this.barChartData = [
          {data: [+chartItems[0].price], label: "Current"},
          {data: [+chartItems[1].price], label: "Next"},
        ]
       }else if(isLastValue){
         this.barChartData = [
           {data: [+chartItems[0].price], label: "Prev"},
           {data: [+chartItems[1].price], label: "Current"},
         ]
       }else{
        this.barChartData = [
          {data: [+chartItems[0].price], label: "Prev"},
          {data: [+chartItems[1].price], label: "Current"},
          {data: [+chartItems[2].price], label: "Next"}
        ]
       }
    
    
    })
  }

}
