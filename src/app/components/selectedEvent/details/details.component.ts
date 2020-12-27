import { Component, Input } from "@angular/core";
import EventItem from "src/app/interfaces/event";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent {
  @Input()
  eventData!: EventItem;
}