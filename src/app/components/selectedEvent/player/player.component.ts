import { Component } from '@angular/core';
import { EventsService } from 'src/app/services/eventsStore.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
 constructor(public eventsService: EventsService){}
 
}
