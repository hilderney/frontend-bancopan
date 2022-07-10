/* tslint:disable:no-unused-variable */

import { ElementRef } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { CpfPipe } from './cpf.pipe';

describe('Pipe: Cpfe', () => {

  const element: ElementRef = new ElementRef('telefone');

  it('create an instance', () => {
    let pipe = new CpfPipe(element);
    expect(pipe).toBeTruthy();
  });

  it('should return empty stgring', () => {
    const pipe = new CpfPipe(element);
    expect(pipe.formatCpfCnpj('')).toBe('');
  });

  it('should ignore non numbers and return 0 ', () => {
    const pipe = new CpfPipe(element);
    expect(pipe.formatCpfCnpj('a')).toBe('');
  });

  it('should return formatted', () => {
    const pipe = new CpfPipe(element);
    expect(pipe.formatCpfCnpj('1234567890')).toBe('(12) 3456-7890');
  });
});
