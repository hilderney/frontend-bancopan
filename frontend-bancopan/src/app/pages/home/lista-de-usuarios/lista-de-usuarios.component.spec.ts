/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ListaDeUsuariosComponent } from './lista-de-usuarios.component';
import { UserService } from 'src/app/services/users/user.service';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { of } from 'rxjs';
import { UserDataSharedService } from 'src/app/services/users/user-data-shared.service';

describe('ListaDeUsuariosComponent', () => {
  let component: ListaDeUsuariosComponent;
  let fixture: ComponentFixture<ListaDeUsuariosComponent>;
  let serviceMock: any;
  let sharedMock: any;

  const mockList: IUsuario[] = [
    { id: 1, name: 'Um', cpf: '12345678912', email: 'asd@asd.com', phone: '12345678912' },
    { id: 2, name: 'Dois', cpf: '12345678912', email: 'asd@asd.com', phone: '12345678912' },
  ];

  const mockUpdate: boolean = true;

  beforeEach(waitForAsync(() => {

    serviceMock = jasmine.createSpyObj(
      'UserService',
      [
        'fetchUsers',
      ]
    );

    sharedMock = jasmine.createSpyObj(
      'UserDataSharedService',
      [
        'getRefreshList$',
      ]
    );

    TestBed.configureTestingModule({
      declarations: [ListaDeUsuariosComponent],
      providers: [
        UserService,
        UserDataSharedService,
        { provide: UserService, useValue: serviceMock },
        { provide: UserDataSharedService, useValue: sharedMock },
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents().then(() => {
        // spyOn(serviceMock, 'fetchUsers').and.returnValue(of(mockList));
        fixture = TestBed.createComponent(ListaDeUsuariosComponent);
        component = fixture.componentInstance;
        spyOn(component, "ngOnInit").and.stub();
        fixture.detectChanges();
      });
  }));

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fetch users from api or storage', () => {
    spyOn(serviceMock, 'fetchUsers').and.returnValue(of(mockList));
    component.fetchUsers();
    expect(component.usuarios.length).toBe(2);
  });

  it('render user list', () => {
    spyOn(sharedMock, 'getRefreshList$').and.returnValue(of(mockUpdate));
    expect(component.refreshListListener).toHaveBeenCalledTimes(2);
  });
});
