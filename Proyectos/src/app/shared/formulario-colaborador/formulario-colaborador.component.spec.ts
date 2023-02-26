import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioColaboradorComponent } from './formulario-colaborador.component';

describe('FormularioColaboradorComponent', () => {
  let component: FormularioColaboradorComponent;
  let fixture: ComponentFixture<FormularioColaboradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioColaboradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
