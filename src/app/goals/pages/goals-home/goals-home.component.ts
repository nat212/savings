import { Component, OnInit } from '@angular/core';
import { fabShowHide } from 'src/app/shared/animations/fab';

@Component({
  selector: 'sv-goals-home',
  templateUrl: './goals-home.component.html',
  styleUrls: ['./goals-home.component.scss'],
  animations: [fabShowHide],
})
export class GoalsHomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
