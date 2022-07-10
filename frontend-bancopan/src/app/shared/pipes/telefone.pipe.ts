import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

declare let $: any;

@Directive({
  selector: '[telefonePipe]'
})
export class TelefonePipe {

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
      this.input.value = this.formatPhone(this.input.value);
  }

  formatPhone(tel: string): string {
    if (!!tel) {
      let value = tel.toString().replace(/\D/g, '');
      value = value.length > 13 ? value.substring(0, 13) : value;

      let foneFormatado = '';

      if (value.length > 12) {
        foneFormatado = value.replace(/(\d{2})?(\d{2})?(\d{5})?(\d{4})/,
          '+$1 ($2) $3-$4');

      } else if (value.length > 11) {
        foneFormatado = value.replace(/(\d{2})?(\d{2})?(\d{4})?(\d{4})/,
          '+$1 ($2) $3-$4');

      } else if (value.length > 10) {
        foneFormatado = value.replace(/(\d{2})?(\d{5})?(\d{4})/, '($1) $2-$3');

      } else if (value.length > 9) {
        foneFormatado = value.replace(/(\d{2})?(\d{4})?(\d{4})/, '($1) $2-$3');

      } else if (value.length > 5) {
        foneFormatado = value.replace(/^(\d{2})?(\d{4})?(\d{0,4})/, '($1) $2-$3');

      } else if (value.length > 1) {
        foneFormatado = value.replace(/^(\d{2})?(\d{0,5})/, '($1) $2');

      } else {
        if (tel !== '') {
          foneFormatado = value.replace(/^(\d*)/, '($1');
        }
      }
      return foneFormatado;
    }
    return '';
  }
}
