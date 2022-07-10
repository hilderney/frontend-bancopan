/* tslint:disable:no-unused-variable */

import { ElementRef } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { TelefonePipe } from './telefone.pipe';

describe('Pipe: Telefone', () => {

  const element: ElementRef = new ElementRef('cpf');

  it('create an instance', () => {
    let pipe = new TelefonePipe(element);
    expect(pipe).toBeTruthy();
  });

  it('should return empty stgring', () => {
    const pipe = new TelefonePipe(element);
    expect(pipe.formatPhone('')).toBe('');
  });

  it('should return formatted', () => {
    const pipe = new TelefonePipe(element);
    expect(pipe.formatPhone('1234567890')).toBe('(12) 3456-7890');
  });
});
