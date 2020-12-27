import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventTableComponent } from './components/event-table/event-table.component';
import { PlayerComponent } from './components/selectedEvent/player/player.component';
import { DetailsComponent } from './components/selectedEvent/details/details.component';
import { PricesChartComponent } from './components/selectedEvent/prices-chart/prices-chart.component';
import { SelectedEventComponent } from './components/selectedEvent/selected-event/selected-event.component';
import { EventsService } from './services/eventsStore.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table'
import {MatSortModule} from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { ChartsModule } from 'ng2-charts';
import { SnapshotTableComponent } from './components/selectedEvent/snapshot-table/snapshot-table.component';
@NgModule({
  declarations: [
    AppComponent,
    EventTableComponent,
    SelectedEventComponent,
    PlayerComponent,
    DetailsComponent,
    SnapshotTableComponent,
    PricesChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    ChartsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule
  ],
  providers: [EventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
