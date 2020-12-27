import { Component } from '@angular/core';
import {  Subscription } from 'rxjs';
import { EventsService } from './services/eventsStore.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private eventsService: EventsService){}

  ngOnInit(): void {
   this.eventsService.getAssets()

  }
}
