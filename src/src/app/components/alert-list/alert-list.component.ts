import { Component, OnInit, Input } from '@angular/core';
import { UiResponseMessage } from 'src/app/models/UiResponse';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss']
})
export class AlertListComponent implements OnInit {

  @Input() public Alerts: UiResponseMessage[];

  constructor() { }

  ngOnInit() {
  }

}
