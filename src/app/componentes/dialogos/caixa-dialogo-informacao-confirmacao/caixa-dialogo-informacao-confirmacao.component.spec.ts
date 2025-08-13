import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaixaDialogoInformacaoConfirmacaoComponent } from './caixa-dialogo-informacao-confirmacao.component';

describe('CaixaDialogoInformacaoConfirmacaoComponent', () => {
  let component: CaixaDialogoInformacaoConfirmacaoComponent;
  let fixture: ComponentFixture<CaixaDialogoInformacaoConfirmacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaixaDialogoInformacaoConfirmacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaixaDialogoInformacaoConfirmacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
