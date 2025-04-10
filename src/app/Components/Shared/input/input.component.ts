import { Component, ElementRef, Input, ViewChild } from '@angular/core';

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
@ViewChild('inputRef') inputElement!: ElementRef;
hideIconVar:boolean=false;

get value(): string {
    return this.inputElement?.nativeElement?.value || '';
  }

set value(val: string) {
    if (this.inputElement) {
      this.inputElement.nativeElement.value = val;
    }
  }

  hideIcon(){
    this.hideIconVar=true;
  }
  showIcon(){
        this.hideIconVar=false;

  }
}
