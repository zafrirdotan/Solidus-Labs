import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import EventItem from '../interfaces/event'
import * as events from '../events.json';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
// This Service is the store of the application it holds all the state of the application;  
export class EventsService {
  eventListSubject$: BehaviorSubject<EventItem[]> = new BehaviorSubject<EventItem[]>([]);
  eventList$: Observable<EventItem[]> = this.eventListSubject$.asObservable();
  eventListLength: number = 0;
  selectedEventIndexSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  selectedEventIndex$: Observable<number> = this.selectedEventIndexSubject$.asObservable();
  selectedEventSubject$: BehaviorSubject<EventItem | undefined> = new BehaviorSubject<EventItem | undefined>(undefined);
  selectedEvent$: Observable<EventItem | undefined> = this.selectedEventSubject$.asObservable();
  eventPlayerInterval: NodeJS.Timeout| undefined ;
  isPlaying: boolean = false;
  isMobile: boolean = false; 
  isChartShowing: boolean = false;
  statusOptions: string[] = []; 
  initialEventList: EventItem[] = [];
  constructor(private utilsService: UtilsService) { 
    this.isMobile = window.innerWidth < 500;
  }
  // Initializes the event list data  
  getAssets(): void{
    this.initialEventList = (events as any).default.sort(this.utilsService.compareTimeStamps).map((event: EventItem, index: number)=>{
     return { ...event, index} as EventItem ;
   })
     // Sets the first observable value (array of events)
    this.eventListSubject$.next(this.initialEventList);
    this.selectedEventSubject$.next(this.eventListSubject$.value[0]);
    this.eventListLength = this.eventListSubject$.value.length;
    // // Initializes the options for the filter  
    this.statusOptions = [...(new Set( this.initialEventList.map((event: EventItem)=> event.status)))];
  }
  // A global filter for the events table. Used globally in order to track the list length.    
  filterAssets(filter: string): void{
    this.eventListSubject$.next(this.initialEventList.filter((event:EventItem )=>{
      return filter? event.status === filter: true;
    }).map((event: EventItem, index: number)=>{
      return { ...event, index} as EventItem ;
    }));
    this.eventListLength = this.eventListSubject$.value.length;
    this.stopPlayer();
  }

  setNextIndex(){
    // If it is the last item in the array the next index will be 0.
    if(this.selectedEventIndexSubject$.value < this.eventListLength - 1){
      this.setSelectedEventIndex( this.selectedEventIndexSubject$.value + 1)
    }else{
      this.setSelectedEventIndex(0);
    }
  }
  
  setPrevIndex(){
    // If it is the last item in the array the next index will be 0.
    if(this.selectedEventIndexSubject$.value > 0){
      this.setSelectedEventIndex( this.selectedEventIndexSubject$.value - 1)
    }else{
      this.setSelectedEventIndex(this.eventListLength - 1);
    }
  }

  setSelectedEventIndex(index: number){
    this.selectedEventIndexSubject$.next(index);
    this.selectedEventSubject$.next(this.eventListSubject$.value[index])

  }

  playEventList(){
    // Switches the item that is showing every 2 secondes.  
    if(!this.eventPlayerInterval){
      this.isPlaying = true;
      this.setNextIndex();
      this.eventPlayerInterval = setInterval(()=>{
        this.setNextIndex();
      }, 3000)
    }
  }

  stopPlayer(){
    if(this.eventPlayerInterval){
      this.isPlaying = false;
      clearInterval(this.eventPlayerInterval);
      this.eventPlayerInterval = undefined;
    }
    
  }

  setLastEvent(){
    this.setSelectedEventIndex(this.eventListLength - 1);
  }

  setFirstEvent(){
    this.setSelectedEventIndex(0);
  }

  setChartDisplay(){
    this.isChartShowing = true;
  }

  setDetailsDisplay(){
    this.isChartShowing = false;
  }

  getSelectedIndex(){
    return this.selectedEventIndexSubject$.value;
  }
}