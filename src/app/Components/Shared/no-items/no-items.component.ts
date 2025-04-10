import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-items',
  standalone: false,
  templateUrl: './no-items.component.html',
  styleUrl: './no-items.component.scss'
})
export class NoItemsComponent {
@Input() header:string='';
@Input() subTitle:string='';
@Input() BtnName:string='';
@Input() route:string='';

}
