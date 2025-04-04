import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: false,
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
@Input() type:string='text';
@Input() id:string="";
@Input() label:string="";
@Input() placeholder:string='';
}
