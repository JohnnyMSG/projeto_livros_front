import {Component, NgModule, ViewChild} from '@angular/core';
import {
  DxButtonModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxPopupModule, DxSelectBoxModule,
  DxSpeedDialActionModule
} from "devextreme-angular";
import {DxTextBoxTypes} from "devextreme-angular/ui/text-box";
import {ItensNota} from "../../shared/models/itensNota";
import {ItensNotaService} from "../../shared/services/itensNota/itens-nota.service";
import {Nota} from "../../shared/models/nota";
import {NotaService} from "../../shared/services/notas/nota.service";
import {Produto} from "../../shared/models/produto";
import {ProdutoService} from "../../shared/services/produtos/produto.service";
import dxSelectBox from "devextreme/ui/select_box";

type EditorOptions = DxTextBoxTypes.Properties;

@Component({
  selector: 'app-itens-nota',
  templateUrl: './itens-nota.component.html',
  styleUrl: './itens-nota.component.scss'
})
export class ItensNotaComponent {

  @ViewChild("dataGrip", {static: false}) dataGrid!: DxDataGridComponent;

  itensNotas: ItensNota[] = [];
  notas: Nota[] = [];
  produtos: Produto[] = [];
  value: ItensNota = new ItensNota();
  popupDeleteVisivel: boolean = false;
  apenasDigitosPattern = /^[\d.,]+$/;
  apenasStringPattern = /^[^0-9]+$/;

  constructor(
    private serviceItensNota: ItensNotaService,
    private serviceNotas: NotaService,
    private serviceProdutos: ProdutoService
  ) {}

  ngOnInit() {
    this.carregarItensNota();
    this.carregarNotas();
    this.carregarProdutos();
  }

  carregarItensNota() {
    this.serviceItensNota.getItensNota().subscribe(dadosItensNota => {
      this.itensNotas = dadosItensNota;
    });
  }

  carregarNotas() {
    this.serviceNotas.getNotas().subscribe(dadosNotas => {
      this.notas = dadosNotas;
    })
  }

  carregarProdutos() {
    this.serviceProdutos.getProdutos().subscribe(dadosProdutos => {
      this.produtos = dadosProdutos
    })
  }

  deleteItensNota(ItensNota: ItensNota) {
    this.serviceItensNota.deleteItemNota(ItensNota.id).subscribe(() => {
      console.log("ItensNota deletado com sucesso!");
      this.carregarItensNota();
    });
  }

  onSavedItensNota(e: any) {
    for (let change of e.changes) {
      if (change.type == 'insert') {
        console.log(change)
        this.serviceItensNota.postItemNota(change.data).subscribe(() => {
          console.log("ItensNota criado com sucesso!");
          this.carregarItensNota();
        })
      } else if (change.type == 'update') {
        this.serviceItensNota.updateItemNota(change.data.id, change.data).subscribe(() => {
          console.log("ItensNota atualizado com sucesso!");
          this.carregarItensNota();
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
    this.deleteItensNota(this.value);
    this.popupDeleteVisivel = false;
  }

  cancelarDelete() {
    this.popupDeleteVisivel = false
  }

  editorOptions: EditorOptions = {
    valueChangeEvent: 'keyup'
  };

  protected readonly dxSelectBox = dxSelectBox;
}

@NgModule({
  declarations: [
    ItensNotaComponent
  ],
  exports: [
    ItensNotaComponent
  ],
  imports: [
    DxDataGridModule,
    DxSpeedDialActionModule,
    DxPopupModule,
    DxButtonModule,
    DxSelectBoxModule,
  ]
})
export class ItensNotaModule { }
