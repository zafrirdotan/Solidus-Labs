import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import ISnapshotData from 'src/app/interfaces/snapshotData';

@Component({
  selector: 'app-snapshot-table',
  templateUrl: './snapshot-table.component.html',
  styleUrls: ['./snapshot-table.component.scss']
})

// The table of the snapshot values BID and ASK
export class SnapshotTableComponent  {
  @Input() 
  snapshotData!: ISnapshotData[];
  displayedColumns: string[] = ['BID', 'ASK'];
}
