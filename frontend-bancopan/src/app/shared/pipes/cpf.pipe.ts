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
      let numeroCpf: string = numero.toString();
      numeroCpf = numeroCpf.replace(/\D/g, "");

      switch (numeroCpf.length) {
        case 4:
          numeroCpf = numeroCpf.replace(/(\d+)(\d{3})/, " $1.$2");
          break;
        case 5:
          numeroCpf = numeroCpf.replace(/(\d+)(\d{3})/, " $1.$2");
          break;
        case 6:
          numeroCpf = numeroCpf.replace(/(\d+)(\d{3})/, " $1.$2");
          break;
        case 7:
          numeroCpf = numeroCpf.replace(/(\d+)(\d{3})(\d{3})/, " $1.$2.$3");
          break;
        case 8:
          numeroCpf = numeroCpf.replace(/(\d+)(\d{3})(\d{3})/, " $1.$2.$3");
          break;
        case 9:
          numeroCpf = numeroCpf.replace(/(\d+)(\d{3})(\d{3})/, " $1.$2.$3");
          break;
        case 10:
          numeroCpf = numeroCpf.replace(/(\d+)(\d{3})(\d{3})(\d{1})/, " $1.$2.$3-$4");
          break;
        case 11:
          numeroCpf = numeroCpf.replace(/(\d+)(\d{3})(\d{3})(\d{2})/, " $1.$2.$3-$4");
          break;
        case 12:
          numeroCpf = numeroCpf.replace(/(\d+)(\d{3})(\d{3})(\d{4})/, " $1.$2.$3/$4");
          break;
        case 13:
          numeroCpf = numeroCpf.replace(/(\d+)(\d{3})(\d{3})(\d{4})(\d{2})/, " $1.$2.$3/$4-$5");
          break;
        case 14:
          numeroCpf = numeroCpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d+)/, " $1.$2.$3/$4-$5");
          break;
      }
      return numeroCpf;
    }
    return '';
  }
}
