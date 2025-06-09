import {Component, NgModule, ViewChild} from '@angular/core';
import {
  DxButtonModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxPopupModule,
  DxSpeedDialActionModule
} from "devextreme-angular";
import {DxTextBoxTypes} from "devextreme-angular/ui/text-box";
import {Produto} from "../../shared/models/produto";
import {ProdutoService} from "../../shared/services/produtos/produto.service";

type EditorOptions = DxTextBoxTypes.Properties;

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent {

  @ViewChild("dataGrip", {static: false}) dataGrid!: DxDataGridComponent;

  produtos: Produto[] = [];
  value: Produto = new Produto();
  popupDeleteVisivel: boolean = false;
  apenasDigitosPattern = /^[\d.,]+$/;
  apenasStringPattern = /^[^0-9]+$/;

  constructor(
    private serviceProdutos: ProdutoService
  ) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.serviceProdutos.getProdutos().subscribe(dadosProdutos => {
      this.produtos = dadosProdutos;
    });
  }

  deleteProduto(produto: Produto) {
    this.serviceProdutos.deleteProdutos(produto.id).subscribe(() => {
      console.log("Produto deletado com sucesso!");
      this.carregarProdutos();
    });
  }

  onSavedProduto(e: any) {
    for (let change of e.changes) {
      if (change.type == 'insert') {
        console.log(change)
        this.serviceProdutos.postProduto(change.data).subscribe(() => {
          console.log("Produto criado com sucesso!");
          this.carregarProdutos();
        })
      } else if (change.type == 'update') {
        this.serviceProdutos.updateProduto(change.data.id, change.data).subscribe(() => {
          console.log("Produto atualizado com sucesso!")
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
    this.deleteProduto(this.value);
    this.popupDeleteVisivel = false;
  }

  cancelarDelete() {
    this.popupDeleteVisivel = false
  }

  editorOptions: EditorOptions = {
    valueChangeEvent: 'keyup'
  };

}

@NgModule({
  declarations: [
    ProdutosComponent
  ],
  imports: [
    DxDataGridModule,
    DxSpeedDialActionModule,
    DxPopupModule,
    DxButtonModule,
  ]
})
export class ProdutosModule { }
