import { Component, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-input',
  standalone: false,
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.scss'
})
// export class SelectInputComponent {
// @Input() label: string = '';
// @Input() id:string='';
// @Input() options:string[]=[];
// @Output() selectedOption:EventEmitter<string>=new EventEmitter<string>();

//  onSelectionChange(event: Event): void {
//     const value = (event.target as HTMLSelectElement).value;
//     this.selectedOption.emit(value);
//   }

export class SelectInputComponent<T extends Record<string, any>>{
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() options: T[] = [];
  @Input() prop:keyof T='';
    @Input() value:keyof T='';
  @Output() selectedOption: EventEmitter<T> = new EventEmitter<T>();

  onSelectionChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    // Try to find the actual option object based on the selected value
    // const selected = this.options.find((opt: any) => String(opt) === value || String((opt as any)?.id) === value);
        const selected = this.options.find((opt: any) => String((opt as any)?.id) === value);
    if (selected) {
      this.selectedOption.emit(selected);
    }
  }
}
