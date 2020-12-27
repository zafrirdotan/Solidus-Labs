import { Injectable } from '@angular/core';
import EventItem from '../interfaces/event'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  compareTimeStamps(a: EventItem , b: EventItem){
    return (a.timestamp > b.timestamp) ? 1 : ((b.timestamp > a.timestamp) ? -1 : 0);
  }
}
