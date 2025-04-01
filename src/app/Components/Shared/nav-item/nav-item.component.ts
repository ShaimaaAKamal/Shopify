import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  standalone: false,
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss'
})
export class NavItemComponent {
@Input() isCollapsed:boolean=false;
@Input() navItemName:string='';
@Input() classes:string='';
}
