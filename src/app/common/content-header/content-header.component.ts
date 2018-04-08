import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.css']
})
export class ContentHeaderComponent implements OnInit {

  @Input()
  firstName: string;
  @Input()
  secondName: string;
  @Input()
  detail: string;

  constructor() { }

  ngOnInit() {
  }

}
