import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'sri-table-app';

  allow : boolean = false;

  ngOnInit() {
  }


  allowServers() : void
  {
    this.allow = true;
  }

  onUpdateServerName(event : Event)
   {
        console.log((<HTMLInputElement>(event.target)).value);
    }
  }