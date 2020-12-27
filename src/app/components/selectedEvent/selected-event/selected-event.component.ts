import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import EventItem from 'src/app/interfaces/event';
import ISnapshotData from 'src/app/interfaces/snapshotData';
import { EventsService } from 'src/app/services/eventsStore.service';

@Component({
  selector: 'app-selected-event',
  templateUrl: './selected-event.component.html',
  styleUrls: ['./selected-event.component.scss']
})

// The parent component that holds all the display of the selected event.
export class SelectedEventComponent implements OnInit {
  eventSubscription$: Subscription | undefined;
  selectedEvent: EventItem| undefined;
  snapshotTable: ISnapshotData[] = [];
  isSnapshotTableOpen: boolean = true;
  constructor(public eventsService: EventsService){}

  ngOnInit(): void {
    // Gets the selected event
    this.eventSubscription$ = this.eventsService.selectedEvent$.subscribe(selectedEvent=>{
        this.selectedEvent = selectedEvent;   
        this.createSnapshotTable();
    
    })
    this.isSnapshotTableOpen = !this.eventsService.isMobile;
  }

   createSnapshotTable(){
    // Creates the data for the snapshot table.
    // Marges to arrays of strings to one array of objects that have two properties:
    // ASK and BID
    // Bid is the maximum price that a buyer is willing to pay,
    // Ask is the minimum price that a seller is willing to sell.
     if(this.selectedEvent){
       const BIDList = this.selectedEvent.snapshot.BID;
       
       this.selectedEvent.snapshot.ASK.forEach((ask, index)=> {
         this.snapshotTable[index] = {ASK: +ask, BID: +BIDList[index]};
        })
        this.snapshotTable = [ ...this.snapshotTable]     
      }
   }
  // Used to toggle the Snapshot Table only on mobile
   toggleIsSnapshotTable(){
    this.isSnapshotTableOpen = !this.isSnapshotTableOpen;
   }
   
   ngOnDestroy(): void {
     this.eventSubscription$?.unsubscribe();
   }

}
