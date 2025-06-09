import {Component, NgModule, ViewChild} from '@angular/core';
import {Fornecedor} from "../../shared/models/fornecedor";
import {FornecedorService} from "../../shared/services/fornecedores/fornecedor.service";
import {
  DxButtonModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxPopupModule,
  DxSpeedDialActionModule
} from "devextreme-angular";
import {NotaService} from "../../shared/services/notas/nota.service";
import {Nota} from "../../shared/models/nota";
import {DxTextBoxTypes} from "devextreme-angular/ui/text-box";

type EditorOptions = DxTextBoxTypes.Properties;

@Component({
  selector: 'fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrl: './fornecedores.component.scss'
})
export class FornecedoresComponent {

  @ViewChild("dataGrip", {static: false}) dataGrid!: DxDataGridComponent;

  fornecedores: Fornecedor[] = [];
  notas: Nota[] = [];
  value: Fornecedor = new Fornecedor();
  popupDeleteVisivel: boolean = false;
  notaComFornecedorExistente: boolean = false;
  apenasDigitosPattern = /^[\d.,]+$/;
  apenasStringPattern = /^[^0-9]+$/;

  constructor(
    private serviceFornecedor: FornecedorService,
    private serviceNotas: NotaService
  ) {
  }

  ngOnInit() {
    this.carregarFornecedores();
    this.carregarNotas();
  }

  carregarFornecedores() {
    this.serviceFornecedor.getFornecedores().subscribe(dadosFornecedores => {
      this.fornecedores = dadosFornecedores;
    })
  }

  carregarNotas() {
    this.serviceNotas.getNotas().subscribe(dadosNotas => {
      this.notas = dadosNotas;
    });
  }

  deletarFornecedor(fornecedor: Fornecedor) {
    console.log(fornecedor)
    for (let nota of this.notas) {
      if (fornecedor.nome == nota.nomeFornecedor) {
        this.notaComFornecedorExistente = true
        return;
      }
    }
    this.serviceFornecedor.deleteFornecedores(fornecedor.id).subscribe(() => {
      console.log("Fornecedor deletado com sucesso!");
      this.carregarFornecedores();
    });
  }

  onSavedFornecedor(e: any) {
    for (let change of e.changes) {
      if (change.type == 'insert') {
        this.serviceFornecedor.postFornecedor(change.data).subscribe(() => {
          console.log("Fornecedor criado com sucesso!");
          this.carregarFornecedores();
        })
      } else if (change.type == 'update') {
        this.serviceFornecedor.updateFornecedores(change.data.id, change.data).subscribe(() => {
          console.log("Fornecedor atualizado com sucesso!")
        });
      }
    }
  }

  addRow() {
    this.dataGrid.instance.addRow();
  }

  popupConfirmacaoDelete(evento: any) {
    evento.cancel = true;
    this.value = evento.data
    this.popupDeleteVisivel = true;
  }

  onPressDeletar() {
    this.deletarFornecedor(this.value);
    this.popupDeleteVisivel = false;
  }

  cancelarDelete() {
    this.popupDeleteVisivel = false
  }

  fecharAviso() {
    this.notaComFornecedorExistente = false;
  }

  editorOptions: EditorOptions = {
    valueChangeEvent: 'keyup'
  };


}

@NgModule({
  declarations: [
    FornecedoresComponent,
  ],
  imports: [
    DxDataGridModule,
    DxSpeedDialActionModule,
    DxButtonModule,
    DxPopupModule
  ]
})
export class FornecedoresModule {
}
