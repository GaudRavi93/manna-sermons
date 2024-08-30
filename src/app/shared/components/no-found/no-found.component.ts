import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-found',
  templateUrl: './no-found.component.html',
  styleUrls: ['./no-found.component.scss'],
})
export class NoFoundComponent implements OnInit {
  @Input() addPadding = false;

  constructor() { }

  ngOnInit() {}

}
