import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-controls',
  standalone: false,
  templateUrl: './page-controls.component.html',
  styleUrl: './page-controls.component.scss'
})
export class PageControlsComponent {
  @Input() route:string='';
  @Input() items:any[]=[];
  @Input() sortKey:string='';
  
  constructor(private __Router:Router){}
  AddNew(){
    this.__Router.navigateByUrl(this.route);
  }
sort(){
this.items.sort((a, b) => a[this.sortKey] - b[this.sortKey]);
}
}
