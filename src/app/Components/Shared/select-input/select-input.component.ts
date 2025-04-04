import { Component, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-input',
  standalone: false,
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.scss'
})
export class SelectInputComponent {
@Input() label: string = '';
@Input() id:string='';
@Input() options:string[]=[];
@Output() selectedOption:EventEmitter<string>=new EventEmitter<string>();

 onSelectionChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedOption.emit(value);
  }
}
