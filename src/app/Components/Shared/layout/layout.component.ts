import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
@Input() route:string='';
@Input() items:any[]=[];
@Input() sortKey:string='';
@Input() header:string='';
@Input() subTitle:string='';
@Input() BtnName:string='';
@Input() columns:any[]=[]
 }


