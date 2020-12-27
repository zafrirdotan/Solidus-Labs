import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/services/eventsStore.service';
import EventItem from '../../interfaces/event'
import {MatTableDataSource} from '@angular/material/table'
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.scss']
})

// This component holds all the factuality and layout for the events table,
// including filter, local sorting by columns, and selection.
// The table shows the selected item, and selects an item on row click.
export class EventTableComponent implements OnInit, AfterViewInit  {
  displayedColumns: string[] = ['timestamp', 'price', 'status'];
  dataSource!: MatTableDataSource<EventItem>;
  $events: Subscription | undefined;
  statusOptions: string[] = [];
  @ViewChild(MatSort)
  sort!: MatSort;
   
   constructor(public eventsService: EventsService){
    this.dataSource = new MatTableDataSource();
   }
  
  ngOnInit(): void {
    this.$events = this.eventsService.eventList$.subscribe((events)=>{
      this.dataSource.data = events;   
    })
   }

   ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.$events?.unsubscribe(); 
  }

  setSelectedEventIndex(row: EventItem){
    this.eventsService.setSelectedEventIndex(row.index);
    this.eventsService.stopPlayer();
  }

  applyFilter({value}: any ) {
    this.eventsService.filterAssets(value)
  }


}
