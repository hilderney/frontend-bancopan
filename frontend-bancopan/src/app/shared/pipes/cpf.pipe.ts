import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

declare var $: any;

@Directive({
  selector: "[cpfPipe]"
})

export class CpfPipe {
  @Output()
  onPressEnter: EventEmitter<any> = new EventEmitter();

  input: any;

  arrayNumber: any[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  arrayFunction: any[] = [, "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    this.input = this.el.nativeElement;
  }

  @HostListener('keyup', ['$event']) onKeyUp(event: KeyboardEvent) {

    if (event.key == "Enter")
      this.onPressEnter.emit();

    else if (this.arrayFunction.indexOf(event.key) < 0)
      this.input.value = this.formatCpfCnpj(this.input.value);
  }

  formatCpfCnpj(numero: string | number): string {
    if (!!numero) {
      let value: string = numero.toString();
      value = value.replace(/\D/g, "");

      value = value.length > 14 ? value.substring(0, 13) : value;

      switch (value.length) {
        case 4:
          value = value.replace(/(\d+)(\d{3})/, " $1.$2");
          break;
        case 5:
          value = value.replace(/(\d+)(\d{3})/, " $1.$2");
          break;
        case 6:
          value = value.replace(/(\d+)(\d{3})/, " $1.$2");
          break;
        case 7:
          value = value.replace(/(\d+)(\d{3})(\d{3})/, " $1.$2.$3");
          break;
        case 8:
          value = value.replace(/(\d+)(\d{3})(\d{3})/, " $1.$2.$3");
          break;
        case 9:
          value = value.replace(/(\d+)(\d{3})(\d{3})/, " $1.$2.$3");
          break;
        case 10:
          value = value.replace(/(\d+)(\d{3})(\d{3})(\d{1})/, " $1.$2.$3-$4");
          break;
        case 11:
          value = value.replace(/(\d+)(\d{3})(\d{3})(\d{2})/, " $1.$2.$3-$4");
          break;
        case 12:
          value = value.replace(/(\d+)(\d{3})(\d{3})(\d{4})/, " $1.$2.$3/$4");
          break;
        case 13:
          value = value.replace(/(\d+)(\d{3})(\d{3})(\d{4})(\d{2})/, " $1.$2.$3/$4-$5");
          break;
        case 14:
          value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d+)/, " $1.$2.$3/$4-$5");
          break;
      }
      return value;
    }
    return '';
  }
}
