/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CadastroComponent } from './cadastro.component';
import { UserService } from 'src/app/services/users/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDataSharedService } from 'src/app/services/users/user-data-shared.service';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CpfPipe } from 'src/app/shared/pipes/cpf.pipe';
import { TelefonePipe } from 'src/app/shared/pipes/telefone.pipe';
import { of } from 'rxjs';
import { IUsuario } from 'src/app/interfaces/usuario.interface';

describe('CadastroComponent', () => {
  let serviceMock: any;
  let loader: HarnessLoader;
  let component: CadastroComponent;
  let fixture: ComponentFixture<CadastroComponent>;

  const mockUsuario: IUsuario = { id: 0, name: '', cpf: '', email: '', phone: '' };

  beforeEach(async(() => {

    const serviceMock = jasmine.createSpyObj(
      'UserService',
      [
        'addUser',
        'updateUser',
      ]
    );

    const sharedDataMock = jasmine.createSpyObj(
      'UserDataSharedService',
      [
        'getUser$',
      ]
    );

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        CadastroComponent,
        CpfPipe,
        TelefonePipe,
      ],
      providers: [
        HttpClient,
        HttpHandler,
        CpfPipe,
        TelefonePipe,
        { provide: UserService, useValue: serviceMock },
        { provide: UserDataSharedService, useValue: sharedDataMock },
        { provide: MatDialogRef, useValue: {} },
      ]

    }).compileComponents().then(() => {


    });

    fixture = TestBed.createComponent(CadastroComponent);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  }));

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should initialize form', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data from shared component', () => {
    expect(component).toBeTruthy();
  });

  it('should close Dialod', () => {
    expect(component).toBeTruthy();
  });

  it('should register a new user', () => {
    expect(component).toBeTruthy();
  });
});
